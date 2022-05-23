package com.tooliv.server.domain.channel.application.webhookService;

import com.tooliv.server.domain.channel.application.chatService.ChatService;
import com.tooliv.server.domain.channel.application.chatService.RedisPublisher;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.WebhookCreateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.WebhookMessageRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.WebhookCreateResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.WebhookListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.WebhookResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.Webhook;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.WebhookRepository;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.channel.execption.SenderNotFoundException;
import com.tooliv.server.domain.channel.execption.WebhookNotFoundException;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.exception.UserNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebhookServiceImpl implements WebhookService {

    private final UserRepository userRepository;

    private final ChannelRepository channelRepository;

    private final WebhookRepository webhookRepository;

    private final ChatService chatService;

    private final RedisPublisher redisPublisher;

    @Override
    public WebhookCreateResponseDTO createWebhook(WebhookCreateRequestDTO webhookCreateRequestDTO) {
        User user = getCurrentUser();

        User sender = userRepository.findByIdAndDeletedAt(webhookCreateRequestDTO.getSenderId(), null)
            .orElseThrow(() -> new SenderNotFoundException("전송자 정보를 찾을 수 없음"));

        Channel channel = channelRepository.findByIdAndDeletedAt(webhookCreateRequestDTO.getChannelId(), null)
            .orElseThrow(() -> new ChannelNotFoundException("해당 채널을 찾을 수 없음"));

        Webhook webhook = Webhook.builder()
            .channel(channel)
            .user(user)
            .sender(sender)
            .name(webhookCreateRequestDTO.getName())
            .createdAt(LocalDateTime.now()).build();

        return new WebhookCreateResponseDTO(webhookRepository.save(webhook).getId());
    }

    @Override
    public void sendMessageThroughWebhook(WebhookMessageRequestDTO webhookMessageRequestDTO) {

        Webhook webhook = webhookRepository.findByIdAndDeletedAt(webhookMessageRequestDTO.getWebhook_id(), null)
            .orElseThrow(() -> new WebhookNotFoundException("웹훅 정보를 찾을 수 없음"));

        String channelId = webhook.getChannel().getId();

        ChatRequestDTO chatRequestDTO = null;
        try {
            chatRequestDTO = ChatRequestDTO.builder()
                .channelId(channelId)
                .contents(webhookMessageRequestDTO.getContent())
                .type("TALK")
                .userId(webhook.getSender().getId())
                .email(webhook.getSender().getEmail())
                .sendTime(LocalDateTime.now())
                .files(null)
                .originFiles(null).build();

            chatService.setChatInfoValue(channelId, chatRequestDTO);

            redisPublisher.publish(chatService.getTopic(channelId), chatRequestDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public WebhookListResponseDTO getWebhookList(String channelId) {
        User currentUser = getCurrentUser();

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new ChannelNotFoundException("채널 정보를 찾을 수 없음"));

        List<Webhook> webhookList = webhookRepository.findByChannelAndUserAndDeletedAt(channel, currentUser, null);

        List<WebhookResponseDTO> webhookResponseDTOList = new ArrayList<>();

        for(Webhook webhook : webhookList) {
            webhookResponseDTOList.add(
                WebhookResponseDTO.builder()
                    .userId(webhook.getUser().getId())
                    .webhookId(webhook.getId())
                    .created_at(webhook.getCreatedAt())
                    .name(webhook.getName()).build()
            );
        }

        return new WebhookListResponseDTO(webhookResponseDTOList);
    }

    @Override
    public void deleteWebhook(String webhookId) {
        User currentUser = getCurrentUser();

        Webhook webhook = webhookRepository.findByIdAndDeletedAt(webhookId, null)
            .orElseThrow(() -> new WebhookNotFoundException("웹훅 정보를 찾을 수 없음"));

        User user = webhook.getUser();

        if(currentUser.getEmail().equals(user.getEmail())) {
            webhook.deleteWebhook(LocalDateTime.now());

            webhookRepository.save(webhook);
        }
    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        return user;
    }

}
