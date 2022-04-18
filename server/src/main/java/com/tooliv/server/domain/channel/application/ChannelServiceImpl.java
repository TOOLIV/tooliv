package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements  ChannelService {

    private final WorkspaceRepository workspaceRepository;

    private final ChannelRepository channelRepository;

    @Transactional
    @Override
    public void registerChannel(RegisterChannelRequestDTO registerChannelRequestDTO) {

        LocalDateTime now = LocalDateTime.now();
        Workspace workspace = workspaceRepository.findByIdAndDeletedAtAfter(registerChannelRequestDTO.getWorkspaceId(), now)
                .orElseThrow(() -> new IllegalArgumentException("워크스페이스 정보가 존재하지 않습니다."));

        Channel channel = Channel.builder()
                .name(registerChannelRequestDTO.getName())
                .privateYn(registerChannelRequestDTO.isPrivateYn())
                .createdAt(now)
                .videoYn(registerChannelRequestDTO.isVideoYn())
                .description(registerChannelRequestDTO.getDescription())
                .workspace(workspace)
                .build();

        channelRepository.save(channel);
    }
}
