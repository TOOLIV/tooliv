package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatRoomService;
import com.tooliv.server.domain.chat.application.ChatService;
import com.tooliv.server.domain.chat.application.RedisPublisher;
import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.chat.application.dto.request.ChatRoomEnterRequestDTO;
import com.tooliv.server.domain.chat.domain.ChatMessage;
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
    private final ChatRoomService chatRoomService;

    // websocket "/api/pub/chat/message"로 들어오는 메시지
    @MessageMapping("/chat/message")
    @ApiOperation(value = "채팅방 메시지", notes = "메시지")
    public void message(ChatRequestDTO chatRequestDTO) {
        // 로그인 회원 정보로 대화명 설정
        ChatMessage message = chatService.createChatMessage(chatRequestDTO);
        chatService.setChatInfoValue(chatRequestDTO.getRoomId(), chatRequestDTO);
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisPublisher.publish(chatService.getTopic(chatRequestDTO.getRoomId()), chatRequestDTO);
    }

    @MessageMapping("/chat/enter")
    public void enterChat(ChatRoomEnterRequestDTO chatRoomEnterRequestDTO){

        System.out.println("ChatMessageController enterChat : " + chatRoomEnterRequestDTO.getRoomId());

        chatRoomService.enterChatRoom(chatRoomEnterRequestDTO.getRoomId());

    }
}
