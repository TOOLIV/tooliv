package com.tooliv.server.domain.workspace.application;

import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.RegisterWorkspaceResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceListGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceNameGetResponseDTO;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceMemberRepository;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import com.tooliv.server.domain.workspace.exception.DuplicateWorkspaceException;
import com.tooliv.server.domain.workspace.exception.WorkspaceNotFoundException;
import com.tooliv.server.global.common.AwsS3Service;
import com.tooliv.server.global.exception.UserNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    private final WorkspaceMemberRepository workspaceMemberRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final ChannelRepository channelRepository;

    private final UserRepository userRepository;

    private final WorkspaceMemberService workspaceMemberService;

    private final ChannelService channelService;

    private final AwsS3Service awsS3Service;

    @Transactional
    @Override
    public RegisterWorkspaceResponseDTO registerWorkspace(MultipartFile multipartFile, RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO) {
        User owner = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보가 존재하지 않습니다."));

        LocalDateTime now = LocalDateTime.now();
        String fileName = null;
        if (multipartFile != null) {
            fileName = awsS3Service.uploadFile(multipartFile);
        }

        boolean existWorkspace = workspaceRepository.existsByNameAndDeletedAt(registerWorkspaceRequestDTO.getName(), null);
        if (existWorkspace) {
            throw new DuplicateWorkspaceException("동일한 이름의 워크스페이스가 존재합니다.");
        }
        Workspace workspace = Workspace.builder()
            .name(registerWorkspaceRequestDTO.getName())
            .createdAt(now)
            .thumbnailImage(fileName)
            .build();

        workspaceRepository.save(workspace);

        WorkspaceMembers workspaceMembers = WorkspaceMembers.builder()
            .createdAt(now)
            .workspaceMemberCode(WorkspaceMemberCode.WADMIN)
            .user(owner)
            .workspace(workspace)
            .build();

        workspaceMemberRepository.save(workspaceMembers);

        Channel channel = Channel.builder()
            .channelCode(ChannelCode.CHAT)
            .privateYn(false)
            .createdAt(now)
            .name("공지사항")
            .workspace(workspace)
            .build();

        channelRepository.save(channel);

        ChannelMembers channelMembers = ChannelMembers.builder()
            .channel(channel)
            .user(owner)
            .createdAt(now)
            .channelMemberCode(ChannelMemberCode.CADMIN)
            .build();

        channelMembersRepository.save(channelMembers);

        RegisterWorkspaceResponseDTO registerWorkspaceResponseDTO = RegisterWorkspaceResponseDTO.builder()
            .id(workspace.getId())
            .build();

        return registerWorkspaceResponseDTO;
    }

    @Transactional
    @Override
    public void modifyWorkspace(MultipartFile multipartFile, ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO) {
        Workspace workspace = workspaceRepository.findById(modifyWorkspaceRequestDTO.getId())
            .orElseThrow(() -> new WorkspaceNotFoundException("해당 워크스페이스를 찾을 수 없습니다."));

        String fileName = null;
        if (multipartFile != null) {
            fileName = awsS3Service.uploadFile(multipartFile);
        }

        workspace.modifyWorkspace(modifyWorkspaceRequestDTO.getName(), fileName);
        workspaceRepository.save(workspace);
    }

    @Transactional
    @Override
    public void deleteWorkspace(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new WorkspaceNotFoundException("해당 워크스페이스를 찾을 수 없습니다."));

        List<WorkspaceMembers> workspaceMembersList = workspaceMemberRepository.findByWorkspace(workspace);
        for (WorkspaceMembers workspaceMember : workspaceMembersList) {
            workspaceMemberService.deleteWorkspaceMember(workspaceId, workspaceMember.getUser().getEmail());
        }

        List<Channel> channelList = channelRepository.findByDeletedAtAndWorkspace(null, workspace);
        for (Channel channel : channelList) {
            channelService.deleteChannel(channel.getId());
        }

        workspace.deleteWorkspace();
        workspaceRepository.save(workspace);
    }

    @Override
    public WorkspaceListGetResponseDTO getWorkspaceList() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보가 존재하지 않습니다."));

        List<Workspace> workspaceList = workspaceRepository.findByUser(user.getId());
        List<WorkspaceGetResponseDTO> workspaceGetResponseDTOList = new ArrayList<>();

        workspaceList.forEach(workspace -> {
            String thumbnailImage = awsS3Service.getFilePath(workspace.getThumbnailImage());
            WorkspaceGetResponseDTO workspaceGetResponseDTO = WorkspaceGetResponseDTO.builder()
                .id(workspace.getId())
                .name(workspace.getName())
                .thumbnailImage(thumbnailImage)
                .build();

            workspaceGetResponseDTOList.add(workspaceGetResponseDTO);
        });
        return new WorkspaceListGetResponseDTO(workspaceGetResponseDTOList);
    }

    @Override
    public WorkspaceNameGetResponseDTO getWorkspaceName(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new WorkspaceNotFoundException("해당 워크스페이스를 찾을 수 없습니다."));

        String thumbnailImage = awsS3Service.getFilePath(workspace.getThumbnailImage());
        WorkspaceNameGetResponseDTO workspaceNameGetResponseDTO = WorkspaceNameGetResponseDTO.builder()
            .name(workspace.getName())
            .thumbnailImage(thumbnailImage)
            .build();

        return workspaceNameGetResponseDTO;
    }
}
