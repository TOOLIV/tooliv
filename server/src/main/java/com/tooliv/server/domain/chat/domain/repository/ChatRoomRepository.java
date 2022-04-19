package com.tooliv.server.domain.chat.domain.repository;

import com.tooliv.server.domain.chat.domain.ChatRoom;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    Optional<List<ChatRoom>> findChatRoomsByCustomer(User customer);
}
