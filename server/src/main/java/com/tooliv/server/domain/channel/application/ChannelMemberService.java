package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelInfoGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberCodeGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;


public interface ChannelMemberService {

    void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO);

    void deleteChannelMember(String channelId, String email);

    ChannelMemberListGetResponseDTO getChannelMemberList(String channelId);

    ChannelMemberListGetResponseDTO searchChannelMember(String channelId, String keyword);

    ChannelMemberListGetResponseDTO searchChannelMemberForRegister(String channelId, String keyword);

    ChannelMemberCodeGetResponseDTO getChannelMemberCode(String channelId);

    ChannelInfoGetResponseDTO getChannelInfo(String channelId);

}
