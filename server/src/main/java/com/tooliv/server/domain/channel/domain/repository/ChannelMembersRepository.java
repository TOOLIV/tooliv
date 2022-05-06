package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelMembersRepository extends JpaRepository<ChannelMembers, String> {

    void deleteByUserAndChannel(User user, Channel channel);

    @Query(value="SELECT * "
        + "FROM channel_members m "
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN channel c ON m.channel_id = c.id "
        + "WHERE c.id = :channel_id AND u.deleted_at IS NULL "
        + "ORDER BY u.name", nativeQuery = true)
    List<ChannelMembers> findWorkspaceMemberByChannel(@Param("channel_id") String channelId);

    @Query(value="SELECT * "
        + "FROM channel_members m "
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN channel c ON m.channel_id = c.id "
        + "WHERE c.id = :channel_id AND u.name LIKE %:keyword%  AND u.deleted_at IS NULL "
        + "ORDER BY u.name LIMIT :offset, 10", nativeQuery = true)
    List<ChannelMembers> searchByChannelIdAndKeyword(@Param("channel_id")String channelId, @Param("keyword") String keyword, @Param("offset") int offset);

    List<ChannelMembers> findByChannel(Channel channel);

    Optional<ChannelMembers> findByChannelAndUser(Channel channel, User user);

    boolean existsByChannelAndUser(Channel channel, User user);

    long countByChannel(Channel channel);

    Optional<List<ChannelMembers>> findByUser(User user);
}