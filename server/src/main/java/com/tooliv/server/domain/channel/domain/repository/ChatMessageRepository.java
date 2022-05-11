package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.ChatMessage;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

    @Query(value="SELECT * "
        + "FROM chat_message c "
        + "WHERE c.content LIKE %:searchContent%", nativeQuery = true)
    Optional<List<ChatMessage>> findByContents(@Param("searchContent") String searchContent);

    Optional<ChatMessage> findByChatChatIdAndChatChannelId(long chatId,String channelId);
}
