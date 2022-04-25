package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelVideoRequestDTO;

public interface ChannelVideoService {

    void addChannelVideo(RegisterChannelVideoRequestDTO registerChannelVideoRequestDTO);

}
