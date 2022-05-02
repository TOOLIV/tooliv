package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectChatRoomRepository extends JpaRepository<DirectChatRoom, String> {

}
