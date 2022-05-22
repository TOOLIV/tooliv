package com.tooliv.server.domain.channel.application.webhookService;

import com.tooliv.server.domain.channel.application.dto.request.WebhookCreateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.WebhookMessageRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.WebhookCreateResponseDTO;
import com.tooliv.server.domain.user.domain.User;

public interface WebhookService {

    WebhookCreateResponseDTO createWebhook(WebhookCreateRequestDTO webhookCreateRequestDTO);

    void sendMessageThroughWebhook(WebhookMessageRequestDTO webhookMessageRequestDTO);

    User getCurrentUser();
}
