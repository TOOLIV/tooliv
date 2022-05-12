package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.chatService.ChatService;
import com.tooliv.server.domain.channel.application.dto.response.ChatRoomChatListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectChatListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectRoomInfoResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "ChannelChat API", tags = {"ChannelChat"})
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChannelChatController {

    private final ChatService chatService;

    @ApiOperation(value = "개인 채팅방 생성", notes = "채팅방을 생성한다.")
    @PostMapping("/directChat/{receiverEmail}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> createDirectRoom(@PathVariable @ApiParam(value = "유저 이름", required = true) String receiverEmail) {
        DirectRoomInfoResponseDTO directRoomInfoResponseDTO;
        try {
            directRoomInfoResponseDTO = chatService.createDirectChatRoom(receiverEmail);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(200).body(DirectRoomInfoResponseDTO.of("채팅방 입장 완료",directRoomInfoResponseDTO));
    }

    @ApiOperation(value = "채팅방 입장", notes = "채팅방을 입장한다.")
    @PostMapping("/channel/{channelId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> enterRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String channelId) {
        try {
            chatService.enterChatRoom(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채팅방 입장 완료"));
    }

    @ApiOperation(value = "Direct 채팅방 입장", notes = "채팅방을 입장한다.")
    @PostMapping("/direct/{channelId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Direct 채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "Direct 채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> enterDirectRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String channelId) {
        try {
            chatService.enterDirectChatRoom(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채팅방 입장 완료"));
    }

    @ApiOperation(value = "채널 채팅방 이전 채팅 데이터")
    @GetMapping("/channel/{channelId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 데이터 복구"),
        @ApiResponse(code = 409, message = "채팅방 데이터 복구 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChatListInRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String channelId) {
        ChatRoomChatListResponseDTO chatRoomChatListResponseDTO;
        try {
            chatRoomChatListResponseDTO = new ChatRoomChatListResponseDTO(chatService.getChatInfoValue(channelId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 데이터 복구 실패"));
        }
        return ResponseEntity.status(200).body(ChatRoomChatListResponseDTO.of("채팅방 기존 데이터", chatRoomChatListResponseDTO));

    }

    @ApiOperation(value = "개인 채팅방 이전 채팅 데이터")
    @GetMapping("/direct/{channelId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 데이터 복구"),
        @ApiResponse(code = 409, message = "채팅방 데이터 복구 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChatListInDirectRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String channelId) {
        DirectChatListResponseDTO directChatListResponseDTO;
        try {
            directChatListResponseDTO = new DirectChatListResponseDTO(chatService.getChatDirectInfoValue(channelId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 데이터 복구 실패"));
        }
        return ResponseEntity.status(200).body(DirectChatListResponseDTO.of("채팅방 기존 데이터", directChatListResponseDTO));
    }

}
