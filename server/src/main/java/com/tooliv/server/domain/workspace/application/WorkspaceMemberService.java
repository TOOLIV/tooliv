package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.DeleteWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;

public interface WorkspaceMemberService {

    void addWorkspaceMember(RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO);

    void deleteWorkspaceMember(DeleteWorkspaceMemberRequestDTO deleteWorkspaceMemberRequestDTO);

}
