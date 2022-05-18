package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelDeleteResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelInfoGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberCodeGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import java.util.List;


public interface ChannelMemberService {

    void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO);

    ChannelDeleteResponseDTO deleteChannelMember(String channelId, String email);

    ChannelMemberListGetResponseDTO getChannelMemberList(String channelId);

    ChannelMemberListGetResponseDTO searchChannelMember(String channelId, String keyword, int sequence);

    ChannelMemberListGetResponseDTO searchChannelMemberForRegister(String channelId, String keyword, int sequence);

    ChannelMemberCodeGetResponseDTO getChannelMemberCode(String channelId);

    ChannelInfoGetResponseDTO getChannelInfo(String channelId);

    List<String> getChannelMemberEmails(String channelId);
}
