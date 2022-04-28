package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelMemberServiceImpl implements ChannelMemberService {

    private final ChannelRepository channelRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final UserRepository userRepository;

    @Transactional
    @Override
    public void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(registerChannelMemberRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        ChannelMembers channelMembers = ChannelMembers.builder()
            .channel(channel)
            .createdAt(LocalDateTime.now())
            .channelMemberCode(ChannelMemberCode.CMEMBER)
            .user(user)
            .build();

        channelMembersRepository.save(channelMembers);
    }

    @Transactional
    @Override
    public void deleteChannelMember(String channelId, DeleteChannelMemberRequestDTO deleteChannelMemberRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(deleteChannelMemberRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        channelMembersRepository.deleteByUserAndChannel(user, channel);
    }

    @Override
    public ChannelMemberListGetResponseDTO getChannelMemberList(String channelId) {
        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        List<ChannelMemberGetResponseDTO> channelMemberGetResponseDTOList = new ArrayList<>();
        List<ChannelMembers> channelMembersList = channelMembersRepository.findByChannel(channel.getId());
        channelMembersList.forEach(channelMembers -> {
            User member = channelMembers.getUser();
            ChannelMemberGetResponseDTO channelMemberGetResponseDTO = ChannelMemberGetResponseDTO.builder()
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .channelMemberCode(channelMembers.getChannelMemberCode())
                .build();

            channelMemberGetResponseDTOList.add(channelMemberGetResponseDTO);
        });
        return new ChannelMemberListGetResponseDTO(channel.getName(), channelMemberGetResponseDTOList);
    }

    @Override
    public ChannelMemberListGetResponseDTO searchChannelMember(String channelId, String keyword) {
    List<ChannelMemberGetResponseDTO> channelMemberGetResponseDTOList = new ArrayList<>();

    Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
        .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

    channelMembersRepository.searchByChannelIdAndKeyword(channelId, keyword).forEach(channelMember -> {
        User member = channelMember.getUser();
        ChannelMemberGetResponseDTO channelMemberGetResponseDTO = ChannelMemberGetResponseDTO.builder()
            .channelMemberCode(channelMember.getChannelMemberCode())
            .nickname(member.getNickname())
            .name(member.getName())
            .email(member.getEmail())
            .build();
        channelMemberGetResponseDTOList.add(channelMemberGetResponseDTO);
    });
        return new ChannelMemberListGetResponseDTO(channel.getName(), channelMemberGetResponseDTOList);
    }
}
