package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;

public interface ChannelMemberService {

    void addChannelMember(RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO);

    void deleteChannelMember(DeleteChannelMemberRequestDTO deleteChannelMemberRequestDTO);

    ChannelMemberListGetResponseDTO getChannelMemberList(String channelId);
}
