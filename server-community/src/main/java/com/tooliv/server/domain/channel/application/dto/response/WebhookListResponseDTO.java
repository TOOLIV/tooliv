package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("WebhookListResponseDTO")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WebhookListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("예약 메세징 목록")
    private List<WebhookResponseDTO> webhookResponseDTOList;

    public static WebhookListResponseDTO of(String message, WebhookListResponseDTO webhookListResponseDTO) {
        webhookListResponseDTO.setMessage(message);

        return webhookListResponseDTO;
    }

}
