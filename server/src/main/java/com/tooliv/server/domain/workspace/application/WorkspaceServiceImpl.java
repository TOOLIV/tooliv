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

    private  final WorkspaceMemberService workspaceMemberService;

    private  final ChannelService channelService;

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
            return null;
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
    public Integer modifyWorkspace(MultipartFile multipartFile, ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO) {
        Workspace workspace = workspaceRepository.findById(modifyWorkspaceRequestDTO.getId())
            .orElseThrow(() -> new IllegalArgumentException("해당 워크스페이스를 찾을 수 없습니다."));

        String fileName = null;
        if (multipartFile != null) {
            fileName = awsS3Service.uploadFile(multipartFile);
        }

        workspace.modifyWorkspace(modifyWorkspaceRequestDTO.getName(), fileName);
        workspaceRepository.save(workspace);
        return 200;
    }

    @Transactional
    @Override
    public Integer deleteWorkspace(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new IllegalArgumentException("해당 워크스페이스를 찾을 수 없습니다."));

        List<WorkspaceMembers> workspaceMembersList = workspaceMemberRepository.findByWorkspace(workspace);
        for (WorkspaceMembers workspaceMember : workspaceMembersList) {
            workspaceMemberService.deleteWorkspaceMember(workspaceId, workspaceMember.getUser().getEmail());
        }

        List<Channel> channelList = channelRepository.findByDeletedAtAndWorkspace(null, workspace);
        for(Channel channel : channelList){
            channelService.deleteChannel(channel.getId());
        }

        workspace.deleteWorkspace();
        workspaceRepository.save(workspace);
        return 200;
    }

    @Override
    public WorkspaceListGetResponseDTO getWorkspaceList() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        List<Workspace> workspaceList = workspaceRepository.findByUser(user.getId());
        List<WorkspaceGetResponseDTO> workspaceGetResponseDTOList = new ArrayList<>();

        workspaceList.forEach(workspace -> {
            WorkspaceGetResponseDTO workspaceGetResponseDTO = WorkspaceGetResponseDTO.builder()
                .id(workspace.getId())
                .name(workspace.getName())
                .thumbnailImage(getImageURL(workspace.getThumbnailImage()))
                .build();

            workspaceGetResponseDTOList.add(workspaceGetResponseDTO);
        });
        return new WorkspaceListGetResponseDTO(workspaceGetResponseDTOList);
    }

    @Override
    public String getImageURL(String fileName) {
        if (fileName == null) {
            return null;
        }
        return "https://tooliva402.s3.ap-northeast-2.amazonaws.com/" + fileName;
    }

    @Override
    public WorkspaceNameGetResponseDTO getWorkspaceName(String workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new IllegalArgumentException("해당 워크스페이스를 찾을 수 없습니다."));

        WorkspaceNameGetResponseDTO workspaceNameGetResponseDTO = WorkspaceNameGetResponseDTO.builder()
            .name(workspace.getName())
            .build();

        return workspaceNameGetResponseDTO;
    }
}
