package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ApiModel("WebhookCreateResponseDTO")
public class WebhookCreateResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("웹훅 ID")
    private String webhook_id;

    public static WebhookCreateResponseDTO of(String message, WebhookCreateResponseDTO webhookCreateResponseDTO) {
        webhookCreateResponseDTO.setMessage(message);
        return webhookCreateResponseDTO;
    }

}
