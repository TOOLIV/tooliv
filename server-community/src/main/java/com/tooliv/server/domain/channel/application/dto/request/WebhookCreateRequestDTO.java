package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("WebhookCreateRequestDTO")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class WebhookCreateRequestDTO {

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "채널 ID")
    private String channelId;

    @NotNull
    @ApiModelProperty(name = "전송자 ID")
    private String senderId;

    @NotNull
    @ApiModelProperty(name = "웹훅 이름")
    private String name;

}
