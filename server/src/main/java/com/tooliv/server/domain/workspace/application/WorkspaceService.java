package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;

public interface WorkspaceService {

    Integer registerWorkspace(String accessToken, RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO);

}
