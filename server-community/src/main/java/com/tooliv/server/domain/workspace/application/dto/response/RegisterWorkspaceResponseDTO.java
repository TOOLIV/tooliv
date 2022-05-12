package com.tooliv.server.domain.workspace.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ApiModel("RegisterWorkspaceResponseDTO")
public class RegisterWorkspaceResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("워크스페이스 ID")
    private String id;

    public static RegisterWorkspaceResponseDTO of(String message, RegisterWorkspaceResponseDTO registerWorkspaceResponseDTO) {
        registerWorkspaceResponseDTO.setMessage(message);
        return registerWorkspaceResponseDTO;
    }

}
