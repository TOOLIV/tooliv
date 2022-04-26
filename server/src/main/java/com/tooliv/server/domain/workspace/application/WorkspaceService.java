package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceListGetResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface WorkspaceService {

    Integer registerWorkspace(MultipartFile multipartFile, RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO);

    Integer modifyWorkspace(ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO);

    Integer deleteWorkspace(String workspaceId);

    WorkspaceListGetResponseDTO getWorkspaceList();

}
