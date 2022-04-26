package com.tooliv.server.domain.workspace.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("DeleteWorkspaceMemberRequestDTO")
@NoArgsConstructor
@Getter
public class DeleteWorkspaceMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "email")
    private String email;

}