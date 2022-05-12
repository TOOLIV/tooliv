package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.request.NotificationLoggedAtUpdateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectInfoDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.NotificationInfoDTO;
import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.DirectChatRoomMembers;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatRoomMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatRoomRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.common.AwsS3Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final ChannelRepository channelRepository;

    private final DirectChatRoomMembersRepository directChatRoomMembersRepository;

    private final DirectChatRoomRepository directChatRoomRepository;

    private final AwsS3Service awsS3Service;

    @Override
    public NotificationListResponseDTO getNotificationList(String email) {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        List<ChannelMembers> channelMembers = channelMembersRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));
        List<NotificationInfoDTO> notificationInfoDTOList = new ArrayList<>();
        for (int i = 0; i < channelMembers.size(); i++) {
            notificationInfoDTOList.add(
                new NotificationInfoDTO(channelMembers.get(i).getChannel().getId(), channelMembers.get(i).getChannel().getWorkspace().getId(),
                    checkNotification(channelMembers.get(i), channelMembers.get(i).getChannel())));
        }
        return new NotificationListResponseDTO(notificationInfoDTOList);
    }

    @Override
    public DirectListResponseDTO getDirectNotificationList(String email) {
        // 현재 나의 아이디
        User sender = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        List<DirectChatRoomMembers> directChatRoomMembersList = directChatRoomMembersRepository.findByUser(sender).orElseThrow(() -> new IllegalArgumentException("메시지 정보가 존재하지 않습니다."));
        List<DirectInfoDTO> directInfoDTOList = new ArrayList<>();
        for (int i = 0; i < directChatRoomMembersList.size(); i++) {
            List<DirectChatRoomMembers> directChatRoomMembers = directChatRoomMembersRepository.findByDirectChatRoom(directChatRoomMembersList.get(i).getDirectChatRoom())
                .orElseThrow(() -> new IllegalArgumentException("다이렉트 룸 정보가 존재하지 않습니다."));
            for (int j = 0; j < directChatRoomMembers.size(); j++) {
                if (!directChatRoomMembers.get(j).getUser().getId().equals(sender.getId())) {
                    User receiver = directChatRoomMembers.get(j).getUser();
                    String imageUrl = awsS3Service.getFilePath(receiver.getProfileImage());
                    directInfoDTOList.add(new DirectInfoDTO(imageUrl, receiver.getNickname(), directChatRoomMembersList.get(i).getDirectChatRoom().getId(),
                        sender.getEmail(), receiver.getEmail(), checkDirectNotification(directChatRoomMembersList.get(i), directChatRoomMembersList.get(i).getDirectChatRoom())));
                }
            }
        }
        return new DirectListResponseDTO(directInfoDTOList);
    }

    @Override
    public void updateLoggedAt(NotificationLoggedAtUpdateRequestDTO notificationLoggedAtUpdateRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        if (notificationLoggedAtUpdateRequestDTO.getType().equals("CHANNEL")) {
            System.out.println("------------------Channel--------------notification----------");
            Channel channel = channelRepository.findById(notificationLoggedAtUpdateRequestDTO.getChannelId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Channel 채팅 방이 존재하지 않습니다."));
            ChannelMembers channelMembers = channelMembersRepository.findByChannelAndUser(channel, user).orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));
            channelMembers.updateLoggedAt();
            System.out.println(LocalDateTime.now());
//            channelMembersRepository.updateLogged(channelMembers.getId(), LocalDateTime.now());
            channelMembersRepository.save(channelMembers);
        } else if (notificationLoggedAtUpdateRequestDTO.getType().equals("DM")) {
            System.out.println("------------------DM--------------notification----------");
            DirectChatRoom directChatRoom = directChatRoomRepository.findById(notificationLoggedAtUpdateRequestDTO.getChannelId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Direct 채팅 방이 존재하지 않습니다."));
            DirectChatRoomMembers directChatRoomMembers = directChatRoomMembersRepository.findByDirectChatRoomAndUser(directChatRoom, user)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다."));
            directChatRoomMembers.updateLoggedAt();
            System.out.println(LocalDateTime.now());
//            directChatRoomMembersRepository.updateLogged(directChatRoomMembers.getId(),LocalDateTime.now());
            directChatRoomMembersRepository.save(directChatRoomMembers);
        }
    }

    boolean checkNotification(ChannelMembers channelMembers, Channel channel) {
        if (channelMembers.getLoggedAt() == null) {// 멤버가 로그인한적 없는 경우
            return true;
        }
        if (channel.getWroteAt() == null) {// 채널에 글이 써진적이 없는 경우
            return false;
        }
        if (channelMembers.getLoggedAt().isBefore(channel.getWroteAt())) {// 멤버가 로그인한 시간이 채널 업데이트시간보다 이전인 경우
            return true;
        } else {
            return false;
        }
    }

    boolean checkDirectNotification(DirectChatRoomMembers directChatRoomMembers, DirectChatRoom directChatRoom) {
        if (directChatRoomMembers.getLoggedAt() == null) {// 멤버가 로그인한적 없는 경우
            return true;
        }
        if (directChatRoom.getWroteAt() == null) {// 채널에 글이 써진적이 없는 경우
            return false;
        }
        if (directChatRoomMembers.getLoggedAt().isBefore(directChatRoom.getWroteAt())) {// 멤버가 로그인한 시간이 채널 업데이트시간보다 이전인 경우
            return true;
        } else {
            return false;
        }
    }
}
