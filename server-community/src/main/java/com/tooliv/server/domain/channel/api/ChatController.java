package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.NotificationService;
import com.tooliv.server.domain.channel.application.chatService.ChatSearchService;
import com.tooliv.server.domain.channel.application.chatService.ChatService;
import com.tooliv.server.domain.channel.application.chatService.RedisPublisher;
import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.NotificationLoggedAtUpdateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.*;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@Api(value = "Chat API", tags = {"Chat"})
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final NotificationService notificationService;
    private final ChatService chatService;
    private final ChatSearchService chatSearchService;

    // websocket "/pub/chat/message"로 들어오는 메시지
    @MessageMapping("/chat/message")
    @ApiOperation(value = "채팅방 메시지", notes = "메시지")
    public void message(ChatRequestDTO chatRequestDTO) {
        try {
            // 로그인 회원 정보로 대화명 설정
            chatService.setChatInfoValue(chatRequestDTO.getChannelId(), chatRequestDTO);

        } catch (Exception e) {
            e.printStackTrace();
        }
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisPublisher.publish(chatService.getTopic(chatRequestDTO.getChannelId()), chatRequestDTO);
    }

    @MessageMapping("/chat/directMessage")
    @ApiOperation(value = "개인 메시지", notes = "메시지")
    public void directMessage(ChatDirectDTO chatDirectDTO) {
        try {
            // 로그인 회원 정보로 대화명 설정
            chatService.setDirectChatInfoValue(chatDirectDTO.getChannelId(), chatDirectDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisPublisher.userPublish(chatService.getTopic(chatDirectDTO.getChannelId()), chatDirectDTO);
    }

//    //websocket "/pub/chat/enter"로 들어오는 메시지
//    @MessageMapping("/chat/enter")
//    @ApiOperation(value = "채팅방 참여")
//    public void enterChat(String channelId) {
//        // 채팅방 참여
//        try {
//            chatService.enterChatRoom(channelId);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    @ApiOperation(value = "개인 채팅방 생성")
    @PostMapping("/api/direct/chat/{receiverEmail}")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> createDirectRoom(@PathVariable @ApiParam(value = "유저 이름", required = true) String receiverEmail) {
        DirectRoomInfoResponseDTO directRoomInfoResponseDTO;
        try {
            directRoomInfoResponseDTO = chatService.createDirectChatRoom(receiverEmail);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(201).body(DirectRoomInfoResponseDTO.of("채팅방 입장 완료", directRoomInfoResponseDTO));
    }

    @ApiOperation(value = "Direct 채팅방 입장")
    @PostMapping("/api/direct/enter/{roomId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Direct 채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "Direct 채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> enterDirectRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String roomId) {
        try {
            chatService.enterDirectChatRoom(roomId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채팅방 입장 완료"));
    }

    @ApiOperation(value = "개인 채팅방 이전 채팅 데이터")
    @GetMapping("/api/direct/chat/{roomId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 데이터 복구"),
        @ApiResponse(code = 409, message = "채팅방 데이터 복구 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChatListInDirectRoom(@PathVariable @ApiParam(value = "방 정보", required = true) String roomId) {
        DirectChatListResponseDTO directChatListResponseDTO;
        try {
            directChatListResponseDTO = new DirectChatListResponseDTO(chatService.getChatDirectInfoValue(roomId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 데이터 복구 실패"));
        }
        return ResponseEntity.status(200).body(DirectChatListResponseDTO.of("채팅방 기존 데이터", directChatListResponseDTO));
    }

    @GetMapping("/api/direct/{email}")
    @ApiOperation(value = "개인 메시지 정보 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "개인 메시지 알람 목록 조회 완료"),
        @ApiResponse(code = 409, message = "개인 메시지 알람 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getDirectNotificationList(@PathVariable String email) {
        DirectListResponseDTO directListResponseDTO = null;

        try {
            directListResponseDTO = notificationService.getDirectNotificationList(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("개인 메시지 알람 목록 조회 실패"));
        }

        return ResponseEntity.status(200).body(DirectListResponseDTO.of("개인 메시지 알람 목록 조회 성공", directListResponseDTO));
    }

    @ApiOperation(value = "채널 채팅방 입장")
    @PostMapping("/api/channel/chat/{channelId}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 입장 완료"),
        @ApiResponse(code = 409, message = "채팅방 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> enterRoom(@PathVariable @ApiParam(value = "채널 채팅방 ID", required = true) String channelId) {
        try {
            chatService.enterChatRoom(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 입장 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채팅방 입장 완료"));
    }

    @ApiOperation(value = "채널 채팅방 이전 채팅 데이터")
    @GetMapping("/api/channel/chat/{channelId}")
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

    @GetMapping("/api/notification/list/{email}")
    @ApiOperation(value = "알람 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "알람 목록 조회 완료"),
        @ApiResponse(code = 409, message = "알람 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelNotificationList(@PathVariable String email) {
        NotificationListResponseDTO notificationListResponseDTO = null;

        try {
            notificationListResponseDTO = notificationService.getNotificationList(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("알람 목록 조회 실패"));
        }
        return ResponseEntity.status(200).body(NotificationListResponseDTO.of("알람 목록 조회 성공", notificationListResponseDTO));
    }

    @PostMapping("/api/notification/update")
    @ApiOperation(value = "알림시간 logged time update")
    @ApiResponses({
        @ApiResponse(code = 200, message = "알림시간 logged time update 완료"),
        @ApiResponse(code = 409, message = "알림시간 logged time update 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> updateNotification(@RequestBody NotificationLoggedAtUpdateRequestDTO notificationLoggedAtUpdateRequestDTO) {
        try {
            notificationService.updateLoggedAt(notificationLoggedAtUpdateRequestDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("알림시간 logged time update 실패"));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("알림시간 logged time update 완료"));
    }

    @GetMapping("/api/search/chat/content")
    @ApiOperation(value = "채팅 내용 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅 내용 검색 완료"),
        @ApiResponse(code = 409, message = "채팅 내용 검색 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelNotificationList(@RequestParam String searchContent, @RequestParam String channelId) {
        ChatSearchInfoListResponseDTO chatSearchInfoListResponseDTO = null;

        try {
            chatSearchInfoListResponseDTO = chatSearchService.getChatList(searchContent, channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅 내용 검색 실패"));
        }

        return ResponseEntity.status(200).body(ChatSearchInfoListResponseDTO.of("채팅 내용 검색 성공", chatSearchInfoListResponseDTO));
    }

    @PostMapping("/api/fileUpload")
    @ApiOperation(value = "파일 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "파일 등록 완료"),
        @ApiResponse(code = 409, message = "파일 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> uploadProfileImage(
        @ApiParam(value = "이미지", required = true) @RequestPart List<MultipartFile> multipartFiles) {
        FileUrlListResponseDTO fileUrlListResponseDTO;
        try {
            fileUrlListResponseDTO = chatService.getFileURL(multipartFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("파일 등록 실패"));
        }
        return ResponseEntity.status(201).body(FileUrlListResponseDTO.of("파일 등록 완료", fileUrlListResponseDTO));
    }

    @GetMapping("/api/fileList/{channelId}")
    @ApiOperation(value = "채널 파일 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "파일 리스트 조회 성공"),
            @ApiResponse(code = 409, message = "파일 리스트 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getFileList(
            @ApiParam(value = "채널, 채팅방 ID", required = true) @PathVariable String channelId
    ) {
        FileListGetResponseDTO fileListGetResponseDTO;
        try {
            fileListGetResponseDTO = chatService.getFileInfoList(channelId);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("파일 등록 실패"));
        }
        return ResponseEntity.status(201).body(FileListGetResponseDTO.of("파일 등록 완료", fileListGetResponseDTO));
    }
}
