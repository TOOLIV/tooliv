package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;

import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;


public interface ChannelMemberService {

    void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO);

    void deleteChannelMember(String channelId, DeleteChannelMemberRequestDTO deleteChannelMemberRequestDTO);

    ChannelMemberListGetResponseDTO getChannelMemberList(String channelId);

    ChannelMemberListGetResponseDTO searchChannelMember(String channelId, String keyword);

    ChannelMemberListGetResponseDTO searchChannelMemberForRegister(String channelId, String keyword);
}
