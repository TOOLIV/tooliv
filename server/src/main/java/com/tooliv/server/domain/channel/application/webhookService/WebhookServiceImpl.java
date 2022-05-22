package com.tooliv.server.domain.channel.application.webhookService;

import com.tooliv.server.domain.channel.application.dto.request.WebhookCreateRequestDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.Webhook;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.WebhookRepository;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.common.AwsS3Service;
import com.tooliv.server.global.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebhookServiceImpl implements WebhookService {

    private final AwsS3Service awsS3Service;

    private final UserRepository userRepository;

    private final ChannelRepository channelRepository;

    private final WebhookRepository webhookRepository;

    @Override
    public void createWebhook(WebhookCreateRequestDTO webhookCreateRequestDTO) {
        User user = getCurrentUser();

        User sender = userRepository.findByIdAndDeletedAt(webhookCreateRequestDTO.getSenderId(), null)
            .orElseThrow();

        Channel channel = channelRepository.findByIdAndDeletedAt(webhookCreateRequestDTO.getChannelId())
            .orElseThrow(() -> new ChannelNotFoundException("해당 채널을 찾을 수 없음"));



        Webhook webhook = Webhook.builder()
            .channel(channel)
            .user(user)
            .sender()
    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        return user;
    }

}
