package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberCodeGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberListGetResponseDTO;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceMemberRepository;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkspaceMemberServiceImpl implements WorkspaceMemberService {

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceMemberRepository workspaceMemberRepository;

    private final ChannelRepository channelRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final UserRepository userRepository;

    @Transactional
    @Override
    public void addWorkspaceMember(String workspaceId, RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO) {
        List<String> emailList = registerWorkspaceMemberRequestDTO.getEmailList();

        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(workspaceId, null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        emailList.forEach(email -> {
            User user = userRepository.findByEmailAndDeletedAt(email, null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

            WorkspaceMembers workspaceMembers = WorkspaceMembers.builder()
                .workspace(workspace)
                .createdAt(LocalDateTime.now())
                .workspaceMemberCode(WorkspaceMemberCode.WMEMBER)
                .user(user)
                .build();

            workspaceMemberRepository.save(workspaceMembers);

            Channel channel = channelRepository.findTopByDeletedAtAndWorkspaceOrderByCreatedAtAsc(null, workspace)
                .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

            ChannelMembers channelMembers = ChannelMembers.builder()
                .channelMemberCode(ChannelMemberCode.CMEMBER)
                .channel(channel)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

            channelMembersRepository.save(channelMembers);

        });

    }

    @Transactional
    @Override
    public void deleteWorkspaceMember(String workspaceId, String email) {
        User user = userRepository.findByEmailAndDeletedAt(email, null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(workspaceId, null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        workspaceMemberRepository.deleteByUserAndWorkspace(user, workspace);
    }

    @Override
    public WorkspaceMemberListGetResponseDTO getWorkspaceMemberList(String workspaceId) {
        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(workspaceId, null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        List<WorkspaceMemberGetResponseDTO> workspaceMemberGetResponseDTOList = new ArrayList<>();
        List<WorkspaceMembers> workspaceMembersList = workspaceMemberRepository.findByWorkspace(workspace.getId());

        workspaceMembersList.forEach(workspaceMember -> {
            User member = workspaceMember.getUser();
            WorkspaceMemberGetResponseDTO workspaceMemberGetResponseDTO = WorkspaceMemberGetResponseDTO.builder()
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .workspaceMemberCode(workspaceMember.getWorkspaceMemberCode())
                .build();

            workspaceMemberGetResponseDTOList.add(workspaceMemberGetResponseDTO);
        });

        return new WorkspaceMemberListGetResponseDTO(workspaceMemberGetResponseDTOList);
    }

    @Override
    public WorkspaceMemberListGetResponseDTO getWorkspaceMemberListForRegister(String workspaceId, String keyword) {
        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(workspaceId, null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        List<WorkspaceMemberGetResponseDTO> workspaceMemberGetResponseDTOList = new ArrayList<>();
        List<User> userList = userRepository.findAllToRegisterWorkspaceMember(workspaceId, keyword);

        userList.forEach(user -> {
            WorkspaceMemberGetResponseDTO workspaceMemberGetResponseDTO = WorkspaceMemberGetResponseDTO.builder()
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .build();

            workspaceMemberGetResponseDTOList.add(workspaceMemberGetResponseDTO);
        });

        return new WorkspaceMemberListGetResponseDTO(workspaceMemberGetResponseDTOList);

    }

    @Override
    public WorkspaceMemberListGetResponseDTO searchWorkspaceMember(String workspaceId, String keyword) {
        List<WorkspaceMemberGetResponseDTO> workspaceMemberGetResponseDTOList = new ArrayList<>();
        workspaceMemberRepository.findByWorkspaceIdAndKeyword(workspaceId, keyword).forEach(workspaceMember -> {
            User member = workspaceMember.getUser();
            WorkspaceMemberGetResponseDTO workspaceMemberGetResponseDTO = WorkspaceMemberGetResponseDTO.builder()
                .workspaceMemberCode(workspaceMember.getWorkspaceMemberCode())
                .nickname(member.getNickname())
                .name(member.getName())
                .email(member.getEmail())
                .build();
            workspaceMemberGetResponseDTOList.add(workspaceMemberGetResponseDTO);
        });
        return new WorkspaceMemberListGetResponseDTO(workspaceMemberGetResponseDTOList);
    }

    @Override
    public WorkspaceMemberCodeGetResponseDTO getWorkspaceMemberCode(String workspaceId) {

        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Workspace workspace = workspaceRepository.findByIdAndDeletedAt(workspaceId, null)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        WorkspaceMembers workspaceMembers = workspaceMemberRepository.findByWorkspaceAndUser(workspace, user)
            .orElseThrow(() -> new IllegalArgumentException("워크스페이스 멤버 정보가 존재하지 않습니다."));

        return  new WorkspaceMemberCodeGetResponseDTO(workspaceMembers.getWorkspaceMemberCode());
    }

}
