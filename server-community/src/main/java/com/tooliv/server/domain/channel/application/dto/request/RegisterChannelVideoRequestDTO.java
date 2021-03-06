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
    @ApiModelProperty(name = "μΈμ ID")
    private String sessionId;

    @NotNull
    @ApiModelProperty(name = "μ±λ ID")
    private String channelId;

}