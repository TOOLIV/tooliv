package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.RegisterWorkspaceResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceListGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceNameGetResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface WorkspaceService {

    RegisterWorkspaceResponseDTO registerWorkspace(MultipartFile multipartFile, RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO);

    void modifyWorkspace(MultipartFile multipartFile, ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO);

    void deleteWorkspace(String workspaceId);

    WorkspaceListGetResponseDTO getWorkspaceList();

    WorkspaceNameGetResponseDTO getWorkspaceName(String workspaceId);

}
