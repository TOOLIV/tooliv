package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
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

    @Query(value="SELECT * "
        + "FROM channel c "
        + "INNER JOIN channel_members m ON m.channel_id = c.id "
        + "WHERE c.workspace_id = :workspace_id AND m.user_id = :user_id AND c.private_yn = false AND c.deleted_at IS NULL", nativeQuery = true)
    List<Channel> findByUserIdAndWorkspaceId(@Param("user_id") String userId, @Param("workspace_id") String workspaceId);
}
