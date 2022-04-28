package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.RegisterChannelResponseDTO;

public interface ChannelService {

    RegisterChannelResponseDTO registerChannel(RegisterChannelRequestDTO registerChannelRequestDTO);

    Integer modifyChannel(ModifyChannelRequestDTO modifyChannelRequestDTO);

    Integer deleteChannel(String channelId);

    ChannelListGetResponseDTO getChannelList(String workspaceId);

    ChannelListGetResponseDTO getPublicChannelList(String workspaceId);

}
