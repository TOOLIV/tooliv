package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelChatNotification;
import com.tooliv.server.domain.channel.domain.DirectChatNotification;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.repository.ChannelChatNotificationRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatNotificationRepository;
import com.tooliv.server.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final ChannelChatNotificationRepository channelChatNotificationRepository;

    private final DirectChatNotificationRepository directChatNotificationRepository;

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
        if(channelChatNotification ==null)
            return;
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
