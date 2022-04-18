package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;

public interface ChannelService {

    void registerChannel(RegisterChannelRequestDTO registerChannelRequestDTO);

}
