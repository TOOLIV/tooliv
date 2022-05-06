package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisChannelTemplate;
    private final RedisTemplate<String, Object> redisDirectTemplate;

    public void publish(ChannelTopic topic, ChatRequestDTO message) {
        redisChannelTemplate.convertAndSend(topic.getTopic(), message);
    }

    public void userPublish(ChannelTopic topic, ChatDirectDTO message) {
        redisDirectTemplate.convertAndSend(topic.getTopic(), message);
    }
}
