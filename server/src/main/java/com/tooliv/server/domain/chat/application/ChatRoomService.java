package com.tooliv.server.domain.chat.application;

import com.tooliv.server.domain.chat.application.dto.request.ChatRoomUserInfoRequestDTO;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomListResponseDTO;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import com.tooliv.server.domain.user.domain.User;

public interface ChatRoomService {

    ChatRoomListResponseDTO getChatRoomList(String email);

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    ChatRoom createChatRoom(ChatRoomUserInfoRequestDTO chatRoomUserInfoRequestDTO);
}
