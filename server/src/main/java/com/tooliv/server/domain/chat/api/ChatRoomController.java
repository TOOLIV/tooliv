package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatRoomService;
import com.tooliv.server.domain.chat.application.dto.request.ChatRoomUserInfoRequestDTO;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomListResponseDTO;
import com.tooliv.server.domain.user.application.UserService;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Chat API", tags = {"ChatRoom"})
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final UserService userService;

    @ApiOperation(value = "room 전체 조회", notes = "채팅 룸 전체를 조회한다.")
    @GetMapping("/rooms/{email}")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 목록 조회 완료"),
        @ApiResponse(code = 409, message = "채팅방 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> rooms(@PathVariable @ApiParam(value = "이메일 정보", required = true) String email) {
        ChatRoomListResponseDTO chatRoomListResponseDTO = null;

        try {
            chatRoomListResponseDTO = chatRoomService.getChatRoomList(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 목록 조회 실패"));
        }

        return ResponseEntity.status(200).body(ChatRoomListResponseDTO.of("채팅방 목록 조회 완료", chatRoomListResponseDTO));

    }

    @ApiOperation(value = "채팅방 개설", notes = "채팅방을 개설한다.")
    @PostMapping("/room")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅방 개설 완료"),
        @ApiResponse(code = 409, message = "채팅방 개설 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> createRoom(@RequestBody @ApiParam(value = "개설 회원 정보", required = true) ChatRoomUserInfoRequestDTO chatRoomUserInfoRequestDTO) {
        try {
            chatRoomService.createChatRoom(chatRoomUserInfoRequestDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅방 개설 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채팅방 개설 완료"));

    }

//    @ApiOperation(value = "방 정보 보기", notes = "방 정보")
//    @GetMapping("/room/{roomId}")
//    public SingleResult<ChatRoom> roomInfo(@PathVariable String roomId) {
//        return responseService.getSingleResult(chatService.findRoomById(roomId));
//    }
//
//    @ApiOperation(value = "customer 별 방 조회")
//    @GetMapping("/customer")
//    public ListResult<ChatRoom> getRoomsByCustomer(){
//        UserIdDto customer=userServiceClient.getUserId(xAuthToken);
//        return responseService.getListResult(chatService.getCustomerEnterRooms(customer));
//    }

}
