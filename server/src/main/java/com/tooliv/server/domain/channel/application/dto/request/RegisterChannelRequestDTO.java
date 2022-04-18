package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel("RegisterChannelRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterChannelRequestDTO {

    @NotNull
    @ApiModelProperty(name = "채널명")
    private String name;

    @ApiModelProperty(name = "비공개 여부")
    private boolean privateYn;

    @ApiModelProperty(name = "화상채널 여부")
    private boolean videoYn;
    
    @ApiModelProperty(name = "채널 설명")
    private String description;
    
    @NotNull
    @ApiModelProperty(name = "워크스페이스ID")
    private String workspaceId;

}