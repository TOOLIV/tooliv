package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.DirectChatRoomMembers;
import com.tooliv.server.domain.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectChatRoomMembersRepository extends JpaRepository<DirectChatRoomMembers, String> {

    Optional<List<DirectChatRoomMembers>> findByUser(User user);

    Optional<List<DirectChatRoomMembers>> findByDirectChatRoom(DirectChatRoom directChatRoom);

    Optional<DirectChatRoomMembers> findByDirectChatRoomAndUser(DirectChatRoom directChatRoom,User user);

    @Query(value="UPDATE direct_chat_room_members "
        + "SET logged_at = :time "
        + "WHERE id = :id", nativeQuery = true)
    void updateLogged(@Param("id")String id,@Param("time") LocalDateTime time);
}
