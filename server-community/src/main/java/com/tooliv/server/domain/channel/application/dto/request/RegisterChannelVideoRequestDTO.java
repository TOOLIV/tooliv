package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("RegisterChannelVideoRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterChannelVideoRequestDTO {

    @NotNull
    @ApiModelProperty(name = "세션 ID")
    private String sessionId;

    @NotNull
    @ApiModelProperty(name = "채널 ID")
    private String channelId;

}