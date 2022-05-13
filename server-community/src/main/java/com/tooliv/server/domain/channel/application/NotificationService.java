package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.NotificationLoggedAtUpdateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;

public interface NotificationService {

    NotificationListResponseDTO getNotificationList(String email);

    DirectListResponseDTO getDirectNotificationList(String email);

    void updateLoggedAt(NotificationLoggedAtUpdateRequestDTO notificationLoggedAtUpdateRequestDTO);

}
