package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

}
