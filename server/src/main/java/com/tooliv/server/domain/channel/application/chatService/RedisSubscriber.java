package com.tooliv.server.domain.channel.application.chatService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.user.application.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisChannelTemplate;
    private final SimpMessageSendingOperations messagingTemplate;
    private final UserService userService;
    private final ChannelMemberService channelMemberService;

    // Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisChannelTemplate.getStringSerializer()
                .deserialize(message.getBody());
            // ChatMessage 객채로 맵핑
            objectMapper.registerModule(new JavaTimeModule());
            ChatRequestDTO chatRequestDTO = objectMapper.readValue(publishMessage, ChatRequestDTO.class);
            List<String> channelMemberEmails = channelMemberService.getChannelMemberEmails(chatRequestDTO.getChannelId());
            for(String email: channelMemberEmails){
                // Websocket 구독자에게 채팅 메시지 Send
                messagingTemplate.convertAndSend("/sub/chat/" + userService.getUserId(email),
                    chatRequestDTO);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
