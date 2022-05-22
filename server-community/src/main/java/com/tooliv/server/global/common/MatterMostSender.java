package com.tooliv.server.global.common;

import com.google.gson.Gson;
import com.tooliv.server.domain.channel.application.dto.request.WebhookMessageRequestDTO;
import com.tooliv.server.global.common.MatterMostMessageDTO.Attachment;
import com.tooliv.server.global.common.MatterMostMessageDTO.Attachments;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MatterMostSender {

    private Logger log = LoggerFactory.getLogger(MatterMostSender.class);

    @Value("${notification.mattermost.enabled}")
    private boolean mmEnabled;
    @Value("${notification.mattermost.webhook-url}")
    private String webhookUrl;

    private final RestTemplate restTemplate;
    private final MatterMostProperties mmProperties;

    public void sendMessage(Exception excpetion, String method, String uri, String params) {
        if (!mmEnabled) {
            return;
        }

        try {
            WebhookMessageRequestDTO webhookMessageRequestDTO = WebhookMessageRequestDTO.builder()
                .webhook_id("039a1907-5ff5-406d-ba7d-e09338d59eb5").build()

            Attachment attachment = Attachment.builder()
                .channel(mmProperties.getChannel())
                .authorIcon(mmProperties.getAuthorIcon())
                .authorName(mmProperties.getAuthorName())
                .color(mmProperties.getColor())
                .pretext(mmProperties.getPretext())
                .title(mmProperties.getTitle())
                .text(mmProperties.getText())
                .footer(mmProperties.getFooter())
                .build();

            attachment.addExceptionInfo(excpetion, method, uri, params);
            Attachments attachments = new Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = new Gson().toJson(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }

    }
}
