package com.tooliv.server.domain.workspace.application.dto.request;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@ApiModel("RegisterWorkspaceRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterWorkspaceRequestDTO {

    @NotNull
    @ApiModelProperty(name = "워크스페이스명")
    private String name;

}