package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.workspace.application.dto.request.DeleteWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberListGetResponseDTO;

public interface WorkspaceMemberService {

    void addWorkspaceMember(RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO);

    void deleteWorkspaceMember(DeleteWorkspaceMemberRequestDTO deleteWorkspaceMemberRequestDTO);

    WorkspaceMemberListGetResponseDTO getWorkspaceMemberList(String workspaceId);

}
