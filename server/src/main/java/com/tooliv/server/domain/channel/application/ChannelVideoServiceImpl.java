package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelVideoRequestDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelVideo;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelVideoRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelVideoServiceImpl implements ChannelVideoService {

    private final ChannelRepository channelRepository;

    private final ChannelVideoRepository channelVideoRepository;

    @Transactional
    @Override
    public void addChannelVideo(RegisterChannelVideoRequestDTO registerChannelVideoRequestDTO) {
        Channel channel = channelRepository.findById(registerChannelVideoRequestDTO.getChannelId())
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        ChannelVideo channelVideo = channelVideoRepository.findByChannel(channel)
            .orElseThrow(() -> new IllegalArgumentException("채널 비디오 정보가 존재하지 않습니다."));

        channelVideo.modifyChannelVideo(registerChannelVideoRequestDTO.getSessionId(), true);
        channelVideoRepository.save(channelVideo);
    }
}
