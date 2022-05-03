package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.user.domain.User;

public interface NotificationService {

    NotificationListResponseDTO getNotificationList(String email);

    void createChannelNotification(User user, Channel channel);

    void createDirectChatNotification(User user, DirectChatRoom directChatRoom);

    void readChannelNotification(User user, Channel channel);

    void readDirectChatNotification(User user, DirectChatRoom directChatRoom);
}
