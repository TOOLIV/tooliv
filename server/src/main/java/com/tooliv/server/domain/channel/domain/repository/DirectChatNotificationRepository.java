package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.DirectChatNotification;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectChatNotificationRepository extends JpaRepository<DirectChatNotification,String> {
    Optional<DirectChatNotification> findByDirectChatRoomAndUserAndNotificationYn(DirectChatRoom directChatRoom, User user,boolean isRead);
}
