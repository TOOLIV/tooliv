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
            .orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));

        List<ChannelMembers> channelMembers = channelMembersRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
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
        // ?????? ?????? ?????????
        User sender = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
        List<DirectChatRoomMembers> directChatRoomMembersList = directChatRoomMembersRepository.findByUser(sender).orElseThrow(() -> new IllegalArgumentException("????????? ????????? ???????????? ????????????."));
        List<DirectInfoDTO> directInfoDTOList = new ArrayList<>();
        for (int i = 0; i < directChatRoomMembersList.size(); i++) {
            List<DirectChatRoomMembers> directChatRoomMembers = directChatRoomMembersRepository.findByDirectChatRoom(directChatRoomMembersList.get(i).getDirectChatRoom())
                .orElseThrow(() -> new IllegalArgumentException("???????????? ??? ????????? ???????????? ????????????."));
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
            .orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
        if (notificationLoggedAtUpdateRequestDTO.getType().equals("CHANNEL")) {
            Channel channel = channelRepository.findById(notificationLoggedAtUpdateRequestDTO.getChannelId())
                .orElseThrow(() -> new IllegalArgumentException("?????? Channel ?????? ?????? ???????????? ????????????."));
            ChannelMembers channelMembers = channelMembersRepository.findByChannelAndUser(channel, user).orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
            channelMembers.updateLoggedAt();
            channelMembersRepository.save(channelMembers);
        } else if (notificationLoggedAtUpdateRequestDTO.getType().equals("DM")) {
            DirectChatRoom directChatRoom = directChatRoomRepository.findById(notificationLoggedAtUpdateRequestDTO.getChannelId())
                .orElseThrow(() -> new IllegalArgumentException("?????? Direct ?????? ?????? ???????????? ????????????."));
            DirectChatRoomMembers directChatRoomMembers = directChatRoomMembersRepository.findByDirectChatRoomAndUser(directChatRoom, user)
                .orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
            directChatRoomMembers.updateLoggedAt();
            directChatRoomMembersRepository.save(directChatRoomMembers);
        }
    }

    boolean checkNotification(ChannelMembers channelMembers, Channel channel) {
        if (channelMembers.getLoggedAt() == null) {// ????????? ??????????????? ?????? ??????
            return true;
        }
        if (channel.getWroteAt() == null) {// ????????? ?????? ???????????? ?????? ??????
            return false;
        }
        if (channelMembers.getLoggedAt().isBefore(channel.getWroteAt())) {// ????????? ???????????? ????????? ?????? ???????????????????????? ????????? ??????
            return true;
        } else {
            return false;
        }
    }

    boolean checkDirectNotification(DirectChatRoomMembers directChatRoomMembers, DirectChatRoom directChatRoom) {
        if (directChatRoomMembers.getLoggedAt() == null) {// ????????? ??????????????? ?????? ??????
            return true;
        }
        if (directChatRoom.getWroteAt() == null) {// ????????? ?????? ???????????? ?????? ??????
            return false;
        }
        if (directChatRoomMembers.getLoggedAt().isBefore(directChatRoom.getWroteAt())) {// ????????? ???????????? ????????? ?????? ???????????????????????? ????????? ??????
            return true;
        } else {
            return false;
        }
    }
}
