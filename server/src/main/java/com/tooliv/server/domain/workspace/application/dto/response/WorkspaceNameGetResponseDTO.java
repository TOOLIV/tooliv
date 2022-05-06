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
@ApiModel("WorkspaceNameGetResponseDTO")
public class WorkspaceNameGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("워크스페이스 이름")
    private String name;

    @ApiModelProperty("워크스페이스 썸네일")
    private String thumbnailImage;

    public static WorkspaceNameGetResponseDTO of(String message, WorkspaceNameGetResponseDTO workspaceNameGetResponseDTO) {
        workspaceNameGetResponseDTO.setMessage(message);
        return workspaceNameGetResponseDTO;
    }

}
