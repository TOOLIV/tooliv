package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelMembersRepository extends JpaRepository<ChannelMembers, String> {

    void deleteByUserAndChannel(User user, Channel channel);

    List<ChannelMembers> findByUser(User user);

    List<ChannelMembers> findByChannel(Channel channel);

}