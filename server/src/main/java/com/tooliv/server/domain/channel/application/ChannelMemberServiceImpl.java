package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.MemberCode;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.time.LocalDateTime;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelMemberServiceImpl  implements ChannelMemberService{

    private final ChannelRepository channelRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final UserRepository userRepository;

    @Transactional
    @Override
    public void addChannelMember(RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(registerChannelMemberRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Channel channel = channelRepository.findByIdAndDeletedAt(registerChannelMemberRequestDTO.getChannelId(), null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        ChannelMembers channelMembers = ChannelMembers.builder()
            .channel(channel)
            .createdAt(LocalDateTime.now())
            .memberCode(MemberCode.GENERAL)
            .user(user)
            .build();

        channelMembersRepository.save(channelMembers);
    }
}
