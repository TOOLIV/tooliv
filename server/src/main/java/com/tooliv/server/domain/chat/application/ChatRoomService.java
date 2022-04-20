package com.tooliv.server.domain.chat.application;

import com.tooliv.server.domain.chat.application.dto.request.ChatRoomUserInfoRequestDTO;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomListResponseDTO;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import com.tooliv.server.domain.user.domain.User;

public interface ChatRoomService {

    ChatRoomListResponseDTO getChatRoomList(String email);

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    ChatRoom createChatRoom(ChatRoomUserInfoRequestDTO chatRoomUserInfoRequestDTO);

    // 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    void enterChatRoom(String roomId);
}
