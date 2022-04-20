package com.tooliv.server.domain.workspace.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
@ApiModel("WorkspaceListGetResponseDTO")
public class WorkspaceListGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("워크스페이스 목록")
    private List<WorkspaceGetResponseDTO> workspaceGetResponseDTOList;

    public WorkspaceListGetResponseDTO() {
    }

    public WorkspaceListGetResponseDTO(List<WorkspaceGetResponseDTO> workspaceGetResponseDTOList) {
        this.workspaceGetResponseDTOList = workspaceGetResponseDTOList;
    }

    public static WorkspaceListGetResponseDTO of(String message, WorkspaceListGetResponseDTO workspaceListGetResponseDTO) {
        workspaceListGetResponseDTO.setMessage(message);

        return workspaceListGetResponseDTO;
    }

}
