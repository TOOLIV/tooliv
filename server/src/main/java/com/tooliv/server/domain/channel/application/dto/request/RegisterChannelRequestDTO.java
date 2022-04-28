package com.tooliv.server.domain.channel.application.dto.request;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("RegisterChannelRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterChannelRequestDTO {

    @NotNull
    @ApiModelProperty(name = "채널명")
    private String name;

    @ApiModelProperty(name = "비공개 여부")
    private boolean privateYn;

    @ApiModelProperty(name = "채널 종류")
    private ChannelCode channelCode;
    
    @NotNull
    @ApiModelProperty(name = "워크스페이스ID")
    private String workspaceId;

}