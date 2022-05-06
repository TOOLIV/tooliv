package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectChatRoomRepository extends JpaRepository<DirectChatRoom, String> {
    Optional<DirectChatRoom> findByUser1AndUser2(User user1,User user2);
}
