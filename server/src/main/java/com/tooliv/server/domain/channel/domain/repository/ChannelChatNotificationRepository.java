package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelChatNotification;
import com.tooliv.server.domain.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelChatNotificationRepository extends JpaRepository<ChannelChatNotification,String> {
    Optional<ChannelChatNotification> findByChannelAndUserAndNotificationYn(Channel channel, User user, boolean isRead);
}
