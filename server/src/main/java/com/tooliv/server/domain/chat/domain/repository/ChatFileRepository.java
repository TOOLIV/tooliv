package com.tooliv.server.domain.chat.domain.repository;

import com.tooliv.server.domain.chat.domain.ChatFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatFileRepository extends JpaRepository<ChatFile, String> {

}
