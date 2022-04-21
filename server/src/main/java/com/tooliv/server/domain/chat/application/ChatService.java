package com.tooliv.server.domain.chat.application;

import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.chat.domain.ChatMessage;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import java.util.List;
import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatService {

    ChatMessage createChatMessage(ChatRequestDTO chatRequestDTO);

    ChannelTopic getTopic(String roomId);

    ChatRoom findRoomById(String roomId);

    // 채팅방 퇴장
    void deleteById(String roomId);

    List<ChatRequestDTO> getChatInfoValue(String key);

    void setChatInfoValue(String key, ChatRequestDTO value);

}
