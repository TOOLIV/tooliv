package com.tooliv.server.domain.workspace.application.dto.response;

import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@ApiModel("WorkspaceMemberCodeGetResponseDTO")
public class WorkspaceMemberCodeGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("워크스페이스 멤버 ID")
    private WorkspaceMemberCode workspaceMemberCode;

    public WorkspaceMemberCodeGetResponseDTO(WorkspaceMemberCode workspaceMemberCode) {
        this.workspaceMemberCode = workspaceMemberCode;
    }

    public static WorkspaceMemberCodeGetResponseDTO of(String message, WorkspaceMemberCodeGetResponseDTO workspaceMemberCodeGetResponseDTO) {
        workspaceMemberCodeGetResponseDTO.setMessage(message);
        return workspaceMemberCodeGetResponseDTO;
    }
}
