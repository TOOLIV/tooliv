package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;

public interface WorkspaceService {

    Integer registerWorkspace(RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO);

    Integer modifyWorkspace(ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO);

    Integer deleteWorkspace(String workspaceId);

}
