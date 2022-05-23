package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChatFile;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.Reservation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatFileRepository extends JpaRepository<ChatFile, String> {

    List<ChatFile> findByReservation(Reservation reservation);

    List<ChatFile> findByChannel(Channel channel);

    List<ChatFile> findByDirectChatRoom(DirectChatRoom directChatRoom);
}
