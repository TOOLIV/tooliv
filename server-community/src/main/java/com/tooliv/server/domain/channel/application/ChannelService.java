package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.RegisterChannelResponseDTO;

public interface ChannelService {

    RegisterChannelResponseDTO registerChannel(RegisterChannelRequestDTO registerChannelRequestDTO);

    void modifyChannel(ModifyChannelRequestDTO modifyChannelRequestDTO);

    void deleteChannel(String channelId);

    ChannelListGetResponseDTO getChannelList(String workspaceId);

    ChannelListGetResponseDTO getPublicChannelList(String workspaceId);

}
