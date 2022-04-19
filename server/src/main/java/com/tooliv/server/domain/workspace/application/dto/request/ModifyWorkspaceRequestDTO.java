package com.tooliv.server.domain.workspace.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@ApiModel("ModifyWorkspaceRequestDTO")
@NoArgsConstructor
@Getter
public class ModifyWorkspaceRequestDTO {

    @NotNull
    @ApiModelProperty(name = "워크스페이스ID")
    private String id;

    @NotNull
    @ApiModelProperty(name = "워크스페이스명")
    private String name;

}