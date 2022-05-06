package com.tooliv.server.domain.channel.application.chatService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
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
public class RedisUserSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisDirectTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    // Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisDirectTemplate.getStringSerializer()
                .deserialize(message.getBody());
            // ChatMessage 객채로 맵핑
            objectMapper.registerModule(new JavaTimeModule());
            ChatDirectDTO chatDirectDTO = objectMapper.readValue(publishMessage, ChatDirectDTO.class);
            // Websocket 구독자에게 채팅 메시지 Send
            messagingTemplate.convertAndSend("/sub/chat/" + chatDirectDTO.getSenderId(),
                chatDirectDTO);
            messagingTemplate.convertAndSend("/sub/chat/" + chatDirectDTO.getReceiverId(),
                chatDirectDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
