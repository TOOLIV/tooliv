package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("WebhookResponseDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WebhookResponseDTO {

    @ApiModelProperty("웹훅 ID")
    private String webhookId;

    @ApiModelProperty("웹훅 생성자 ID")
    private String userId;

    @ApiModelProperty("웹훅 이름")
    private String name;

    @ApiModelProperty("생성 시간")
    private LocalDateTime created_at;

}
