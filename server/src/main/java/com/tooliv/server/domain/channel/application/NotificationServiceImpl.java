package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelChatNotification;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.DirectChatNotification;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.repository.ChannelChatNotificationRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatNotificationRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final ChannelChatNotificationRepository channelChatNotificationRepository;

    private final DirectChatNotificationRepository directChatNotificationRepository;

    private final UserRepository userRepository;

    private final ChannelMembersRepository channelMembersRepository;

    @Override
    public NotificationListResponseDTO getNotificationList(String email) {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        List<ChannelMembers> channelMembers = channelMembersRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("채널 정보가 존재하지 않습니다."));
        List<String> members = new ArrayList<>();
        for (int i = 0; i < channelMembers.size(); i++) {
            members.add(channelMembers.get(i).getChannel().getId());
        }
        return new NotificationListResponseDTO(members);
    }

    @Override
    public void createChannelNotification(User user, Channel channel) {// 채팅방 알람 생성
        ChannelChatNotification channelChatNotification = ChannelChatNotification.builder().channel(channel).user(user).build();
        channelChatNotificationRepository.save((channelChatNotification));
    }

    @Override
    public void createDirectChatNotification(User user, DirectChatRoom directChatRoom) {// 개인 메시지지 알람 생성
        DirectChatNotification directChatNotification = DirectChatNotification.builder().directChatRoom(directChatRoom).user(user).build();
        directChatNotificationRepository.save((directChatNotification));
    }

    @Override
    public void readChannelNotification(User user, Channel channel) {
        ChannelChatNotification channelChatNotification = channelChatNotificationRepository.findByChannelAndUserAndNotificationYn(channel, user, false).orElse(null);
        if (channelChatNotification == null) {
            return;
        }
        channelChatNotification.updateRead(true);
        channelChatNotificationRepository.save(channelChatNotification);
    }

    @Override
    public void readDirectChatNotification(User user, DirectChatRoom directChatRoom) {
        DirectChatNotification directChatNotification = directChatNotificationRepository.findByDirectChatRoomAndUserAndNotificationYn(directChatRoom, user, false).orElse(null);
        directChatNotification.updateRead(true);
        directChatNotificationRepository.save(directChatNotification);
    }
}
