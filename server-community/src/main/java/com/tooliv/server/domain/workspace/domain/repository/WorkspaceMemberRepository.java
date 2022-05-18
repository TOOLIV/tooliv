package com.tooliv.server.domain.workspace.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMembers, String> {

    void deleteByUserAndWorkspace(User user, Workspace workspace);

    @Query(value="SELECT * "
        + "FROM workspace_members m "
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN workspace w ON m.workspace_id = w.id "
        + "WHERE w.id = :workspace_id  AND u.deleted_at IS NULL "
        + "ORDER BY u.name", nativeQuery = true)
    List<WorkspaceMembers> findByWorkspace(@Param("workspace_id") String workspaceId);

    @Query(value="SELECT * "
        + "FROM workspace_members m "
        + "JOIN user u ON m.user_id = u.id "
        + "WHERE m.workspace_id = :workspace_id AND u.deleted_at IS NULL AND u.name LIKE %:keyword% AND u.id NOT IN (\n"
        + "SELECT DISTINCT c.user_id\n"
        + "FROM channel_members c\n"
        + " WHERE c.channel_id = :channel_id\n"
        + ")\n"
        + "ORDER BY u.name LIMIT :offset, 10 ", nativeQuery = true)
    List<WorkspaceMembers> findAllToRegisterChannelMember(@Param("workspace_id") String workspaceId, @Param("channel_id") String channelId, @Param("keyword") String keyword, @Param("offset") int offset);

    @Query(value="SELECT * "
        + "FROM workspace_members m "
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN workspace w ON m.workspace_id = w.id "
        + "WHERE w.id = :workspace_id AND u.name LIKE %:keyword% AND u.deleted_at IS NULL "
        + "ORDER BY u.name LIMIT :offset, 10 ", nativeQuery = true)
    List<WorkspaceMembers> findByWorkspaceIdAndKeyword(@Param("workspace_id")String workspaceId, @Param("keyword") String keyword, @Param("offset") int offset);

    List<WorkspaceMembers> findByWorkspace(Workspace workspace);

    Optional<WorkspaceMembers> findByWorkspaceAndUser(Workspace workspace, User user);

    long countByWorkspace(Workspace workspace);

}
