package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.ChatMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

    Optional<List<ChatMessage>> findByContentContaining(String content);

    Optional<ChatMessage> findByChatChatIdAndChatChannelId(long chatId,String channelId);
}
