package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatService;
import com.tooliv.server.domain.chat.application.RedisPublisher;
import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.chat.domain.ChatMessage;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Chat API", tags = {"Chat"})
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;

    // websocket "/api/pub/chat/message"로 들어오는 메시지
    @MessageMapping("/chat/message")
    @ApiOperation(value = "채팅방 메시지", notes = "메시지")
    @ApiResponses({
        @ApiResponse(code = 200, message = "메시지 전송"),
        @ApiResponse(code = 409, message = "메시지 전송 실패"),
    })
    public void message(ChatRequestDTO chatRequestDTO) {
        // 로그인 회원 정보로 대화명 설정
        ChatMessage message = chatService.createChatMessage(chatRequestDTO);
        // 채팅방 입장시에는 대화명과 메시지를 자동으로 세팅한다.
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message1.setSender("[알림]");
//            message1.setMessage(user.getName() + "님이 입장하셨습니다.");
//        } else if (ChatMessage.MessageType.QUIT.equals(message.getType())) {
//            message1.setSender("[알림]");
//            message1.setMessage(user.getName() + "님이 퇴장하셨습니다.");
//            chatService.deleteById(message.getChatRoom());
//        }
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisPublisher.publish(chatService.getTopic(chatRequestDTO.getRoomId()), message);
    }
}
