package com.tooliv.server.domain.workspace.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("RegisterWorkspaceMemberRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterWorkspaceMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "워크스페이스 ID")
    private String workspaceId;

    @NotNull
    @ApiModelProperty(name = "email")
    private String email;

}