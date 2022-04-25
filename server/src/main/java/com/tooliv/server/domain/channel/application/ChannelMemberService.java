package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;

public interface ChannelMemberService {

    void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO);

    void deleteChannelMember(String channelId, DeleteChannelMemberRequestDTO deleteChannelMemberRequestDTO);

}
