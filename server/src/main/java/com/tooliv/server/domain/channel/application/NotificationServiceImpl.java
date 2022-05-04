package com.tooliv.server.domain.channel.application;

import com.tooliv.server.domain.channel.application.dto.response.NotificationInfoDTO;
import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.DirectChatNotification;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatNotificationRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final DirectChatNotificationRepository directChatNotificationRepository;

    private final UserRepository userRepository;

    private final ChannelMembersRepository channelMembersRepository;

    private final WorkspaceRepository workspaceRepository;

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
    public void createDirectChatNotification(User user, DirectChatRoom directChatRoom) {// 개인 메시지지 알람 생성
        DirectChatNotification directChatNotification = DirectChatNotification.builder().directChatRoom(directChatRoom).user(user).build();
        directChatNotificationRepository.save((directChatNotification));
    }

    @Override
    public void readDirectChatNotification(User user, DirectChatRoom directChatRoom) {
        DirectChatNotification directChatNotification = directChatNotificationRepository.findByDirectChatRoomAndUserAndNotificationYn(directChatRoom, user, false).orElse(null);
        directChatNotification.updateRead(true);
        directChatNotificationRepository.save(directChatNotification);
    }

    boolean checkNotification(ChannelMembers channelMembers, Channel channel) {
        if (channelMembers.getLoggedAt() == null) {// 멤버가 로그인한적 없는 경우
            return false;
        }
        if (channel.getWroteAt() == null) {// 채널에 글이 써진적이 없는 경우
            return true;
        }
        if (channelMembers.getLoggedAt().isBefore(channel.getWroteAt())) {// 멤버가 로그인한 시간이 채널 업데이트시간보다 이전인 경우
            return false;
        } else {
            return true;
        }
    }
}
