package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.workspace.domain.Workspace;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {

    Optional<Channel> findByIdAndDeletedAt(String id, LocalDateTime deletedAt);

    Optional<Channel> findByWorkspaceIdAndName(String id, String name);

    @Query(value="SELECT * "
        + "FROM channel c "
        + "INNER JOIN channel_members m ON m.channel_id = c.id "
        + "WHERE c.workspace_id = :workspace_id AND c.deleted_at IS NULL AND m.user_id = :user_id "
        + "ORDER BY c.created_at ASC", nativeQuery = true)
    List<Channel> findByWorkspaceIdAndUser(@Param("workspace_id") String workspaceId, @Param("user_id") String userId);

    @Query(value="SELECT c.id "
        + "FROM channel c "
        + "WHERE c.workspace_id = :workspace_id AND c.private_yn = false AND c.deleted_at IS NULL AND c.id NOT IN ("
        + "SELECT m.channel_id "
        + "FROM channel_members m "
        + "WHERE m.user_id = :user_id "
        + ") "
        + "ORDER BY created_at ASC", nativeQuery = true)
    List<String> findByPublicWorkspaceId(@Param("workspace_id") String workspaceId, @Param("user_id") String userId);

    Optional<Channel> findTopByDeletedAtAndWorkspaceOrderByCreatedAtAsc(LocalDateTime deletedAt, Workspace workspace);

    List<Channel> findByDeletedAtAndWorkspace(LocalDateTime deleted_at, Workspace workspace);

}
