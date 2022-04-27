package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelMembersRepository extends JpaRepository<ChannelMembers, String> {

    void deleteByUserAndChannel(User user, Channel channel);

    List<ChannelMembers> findByUser(User user);

    List<ChannelMembers> findByChannel(Channel channel);

    @Query(value="SELECT * "
        + "FROM channel_members m "
        + "INNER JOIN user u ON m.user_id = u.id "
        + "INNER JOIN channel c ON m.channel_id = c.id "
        + "WHERE c.id = :channel_id AND u.name LIKE %:keyword%", nativeQuery = true)
    List<ChannelMembers> searchByChannelIdAndKeyword(@Param("channel_id")String channelId, @Param("keyword") String keyword);

}