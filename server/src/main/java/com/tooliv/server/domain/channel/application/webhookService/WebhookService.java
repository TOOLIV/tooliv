package com.tooliv.server.domain.channel.application.webhookService;

import com.tooliv.server.domain.channel.application.dto.request.WebhookCreateRequestDTO;
import com.tooliv.server.domain.user.domain.User;

public interface WebhookService {

    void createWebhook(WebhookCreateRequestDTO webhookCreateRequestDTO);

    User getCurrentUser();
}
