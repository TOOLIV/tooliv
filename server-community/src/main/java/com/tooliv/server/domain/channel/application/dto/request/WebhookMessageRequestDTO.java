package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("WebhookMessageRequestDTO")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class WebhookMessageRequestDTO {

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "웹훅 ID")
    private String webhook_id;

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "보낼 메세지 내용")
    private String content;

}
