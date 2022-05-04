package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.DirectChatRoomMembers;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectChatRoomMembersRepository extends JpaRepository<DirectChatRoomMembers, String> {

    Optional<List<DirectChatRoomMembers>> findByUser(User user);

    Optional<List<DirectChatRoomMembers>> findByDirectChatRoom(DirectChatRoom directChatRoom);

    Optional<DirectChatRoomMembers> findByDirectChatRoomAndUser(DirectChatRoom directChatRoom,User user);
}
