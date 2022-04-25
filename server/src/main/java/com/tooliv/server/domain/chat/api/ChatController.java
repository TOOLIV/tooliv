package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatService;
import com.tooliv.server.domain.chat.application.RedisPublisher;
import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.chat.application.dto.request.ChatRoomEnterRequestDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Chat API", tags = {"Chat"})
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;

    // websocket "/pub/chat/message"로 들어오는 메시지
    @MessageMapping("/chat/message")
    @ApiOperation(value = "채팅방 메시지", notes = "메시지")
    public void message(ChatRequestDTO chatRequestDTO) {
        // 로그인 회원 정보로 대화명 설정
        chatService.setChatInfoValue(chatRequestDTO.getRoomId(), chatRequestDTO);
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisPublisher.publish(chatService.getTopic(chatRequestDTO.getRoomId()), chatRequestDTO);
    }

    // websocket "/pub/chat/enter"로 들어오는 메시지
    @MessageMapping("/chat/enter")
    @ApiOperation(value = "채팅방 참여")
    public void enterChat(ChatRoomEnterRequestDTO chatRoomEnterRequestDTO){
        // 채팅방 참여
        chatService.enterChatRoom(chatRoomEnterRequestDTO.getRoomId());
    }
}
