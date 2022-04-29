package com.tooliv.server.domain.workspace.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import java.util.List;
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
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN workspace w ON m.workspace_id = w.id "
        + "WHERE w.id = :workspace_id AND u.name LIKE %:keyword% AND u.deleted_at IS NULL "
        + "ORDER BY u.name", nativeQuery = true)
    List<WorkspaceMembers> findByWorkspaceIdAndKeyword(@Param("workspace_id")String workspaceId, @Param("keyword") String keyword);

}
