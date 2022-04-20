package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.DeleteWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceMemberRepository;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import java.time.LocalDateTime;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkspaceMemberServiceImpl implements WorkspaceMemberService {

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceMemberRepository workspaceMemberRepository;

    private final UserRepository userRepository;

    @Transactional
    @Override
    public void addWorkspaceMember(RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(registerWorkspaceMemberRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(registerWorkspaceMemberRequestDTO.getWorkspaceId(), null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        WorkspaceMembers workspaceMembers = WorkspaceMembers.builder()
            .workspace(workspace)
            .createdAt(LocalDateTime.now())
            .workspaceMemberCode(WorkspaceMemberCode.WMEMBER)
            .user(user)
            .build();

        workspaceMemberRepository.save(workspaceMembers);
    }

    @Transactional
    @Override
    public void deleteWorkspaceMember(DeleteWorkspaceMemberRequestDTO deleteWorkspaceMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(deleteWorkspaceMemberRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(deleteWorkspaceMemberRequestDTO.getWorkspaceId(), null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        workspaceMemberRepository.deleteByUserAndWorkspace(user, workspace);
    }
}
