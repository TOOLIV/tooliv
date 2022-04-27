package com.tooliv.server.domain.chat.domain.repository;

import com.tooliv.server.domain.chat.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

}
