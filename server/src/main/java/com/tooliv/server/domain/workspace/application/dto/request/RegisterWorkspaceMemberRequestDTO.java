package com.tooliv.server.domain.workspace.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("RegisterWorkspaceMemberRequestDTO")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RegisterWorkspaceMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "email 목록")
    private List<String> emailList;

}