package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberCodeGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberListGetResponseDTO;

public interface WorkspaceMemberService {

    void addWorkspaceMember(String workspaceId, RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO);

    void deleteWorkspaceMember(String workspaceId, String email);

    WorkspaceMemberListGetResponseDTO getWorkspaceMemberList(String workspaceId);

    WorkspaceMemberListGetResponseDTO getWorkspaceMemberListForRegister(String workspaceId, String keyword);

    WorkspaceMemberListGetResponseDTO searchWorkspaceMember(String workspaceId, String keyword);

    WorkspaceMemberCodeGetResponseDTO getWorkspaceMemberCode(String workspaceId);

}
