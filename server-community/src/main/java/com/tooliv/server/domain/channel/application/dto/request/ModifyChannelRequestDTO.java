package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ModifyChannelRequestDTO")
@NoArgsConstructor
@Getter
public class ModifyChannelRequestDTO {

    @NotNull
    @ApiModelProperty(name = "채널ID")
    private String id;

    @NotNull
    @ApiModelProperty(name = "채널명")
    private String name;

}