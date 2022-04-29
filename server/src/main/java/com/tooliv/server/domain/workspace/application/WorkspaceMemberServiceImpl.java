package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.DeleteWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkspaceMemberServiceImpl implements WorkspaceMemberService {

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceMemberRepository workspaceMemberRepository;

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
        });

    }

    @Transactional
    @Override
    public void deleteWorkspaceMember(String workspaceId, DeleteWorkspaceMemberRequestDTO deleteWorkspaceMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(deleteWorkspaceMemberRequestDTO.getEmail(), null)
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

}
