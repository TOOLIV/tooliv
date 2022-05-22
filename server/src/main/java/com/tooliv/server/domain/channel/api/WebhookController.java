package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.dto.request.WebhookCreateRequestDTO;
import com.tooliv.server.domain.channel.application.webhookService.WebhookService;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.UserNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Webhook API", tags = {"Webhook"})
@RequiredArgsConstructor
@RequestMapping("/api/webhook")
public class WebhookController {

    private final WebhookService webhookService;

    @PostMapping
    @ApiOperation(value = "웹훅 생성성")
   public ResponseEntity<? extends BaseResponseDTO> createWebhook(
        @RequestBody @Valid @ApiParam(value = "웹훅 정보", required = true) WebhookCreateRequestDTO webhookCreateRequestDTO) {
        try {
            webhookService.createWebhook(webhookCreateRequestDTO);
        } catch (UserNotFoundException | ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("예약 메세징 등록 완료"));
    }


}
