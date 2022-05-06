package com.tooliv.server.domain.workspace.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
@ApiModel("WorkspaceMemberListGetResponseDTO")
public class WorkspaceMemberListGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("워크스페이스 멤버 목록")
    private List<WorkspaceMemberGetResponseDTO> workspaceMemberGetResponseDTOList;

    public WorkspaceMemberListGetResponseDTO() {
    }

    public WorkspaceMemberListGetResponseDTO(List<WorkspaceMemberGetResponseDTO> workspaceMemberGetResponseDTOList) {
        this.workspaceMemberGetResponseDTOList = workspaceMemberGetResponseDTOList;
    }

    public static WorkspaceMemberListGetResponseDTO of(String message, WorkspaceMemberListGetResponseDTO workspaceMemberListGetResponseDTO) {
        workspaceMemberListGetResponseDTO.setMessage(message);

        return workspaceMemberListGetResponseDTO;
    }

}
