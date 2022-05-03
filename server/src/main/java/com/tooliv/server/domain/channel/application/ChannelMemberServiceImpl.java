package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelInfoGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberCodeGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceMemberRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelMemberServiceImpl implements ChannelMemberService {

    private final ChannelRepository channelRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final WorkspaceMemberRepository workspaceMemberRepository;

    private final UserRepository userRepository;

    @Transactional
    @Override
    public void addChannelMember(String channelId, RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        List<String> emailList = registerChannelMemberRequestDTO.getEmailList();

        for (String email : emailList) {

            User user = userRepository.findByEmailAndDeletedAt(email, null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

            if (channelMembersRepository.existsByChannelAndUser(channel, user)) {
                continue;
            }

            ChannelMembers channelMembers = ChannelMembers.builder()
                .channel(channel)
                .createdAt(LocalDateTime.now())
                .channelMemberCode(ChannelMemberCode.CMEMBER)
                .user(user)
                .build();

            channelMembersRepository.save(channelMembers);

        }
    }

    @Transactional
    @Override
    public void deleteChannelMember(String channelId, String email) {
        User user = userRepository.findByEmailAndDeletedAt(email, null)
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

    @Override
    public ChannelMemberListGetResponseDTO searchChannelMemberForRegister(String channelId, String keyword) {
        List<ChannelMemberGetResponseDTO> channelMemberGetResponseDTOList = new ArrayList<>();

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        List<ChannelMembers> channelMembersList = channelMembersRepository.findByChannel(channel);

        List<WorkspaceMembers> searchMemberList = workspaceMemberRepository.findByWorkspaceIdAndKeyword(channel.getWorkspace().getId(), keyword);
        search:
        for (WorkspaceMembers searchMember : searchMemberList) {

            User member = searchMember.getUser();
            for (ChannelMembers channelMember : channelMembersList) {
                if (member.equals(channelMember.getUser())) {
                    continue search;
                }
            }

            ChannelMemberGetResponseDTO channelMemberGetResponseDTO = ChannelMemberGetResponseDTO.builder()
                .nickname(member.getNickname())
                .name(member.getName())
                .email(member.getEmail())
                .build();
            channelMemberGetResponseDTOList.add(channelMemberGetResponseDTO);

        }
        return new ChannelMemberListGetResponseDTO(channel.getName(), channelMemberGetResponseDTOList);
    }

    @Override
    public ChannelMemberCodeGetResponseDTO getChannelMemberCode(String channelId) {

        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        ChannelMembers channelMember = channelMembersRepository.findByChannelAndUser(channel,user)
            .orElseThrow(() -> new IllegalArgumentException("채널 멤버 정보가 존재하지 않습니다."));

        return new ChannelMemberCodeGetResponseDTO(channelMember.getChannelMemberCode());
    }

    @Override
    public ChannelInfoGetResponseDTO getChannelInfo(String channelId) {
        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));

        ChannelInfoGetResponseDTO channelInfoGetResponseDTO = ChannelInfoGetResponseDTO.builder()
            .name(channel.getName())
            .numOfPeople(channelMembersRepository.countByChannel(channel))
            .build();
        return channelInfoGetResponseDTO;
    }
}
