package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatService;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import com.tooliv.server.domain.user.application.UserService;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatService chatService;
    private final UserService userService;

//    @ApiOperation(value = "room 전체 조회", notes = "채팅 룸 전체를 조회한다.")
//    @GetMapping("/rooms")
//    public ResponseEntity<? extends BaseResponseDTO> rooms() {
//        return responseService.getListResult(chatService.findAllRoom());
//    }

//    @ApiOperation(value = "채팅방 개설", notes = "채팅방을 개설한다.")
//    @PostMapping("/room")
//    public SingleResult<ChatRoom> createRoom(@RequestBody UserIdDto store) {
//        UserIdDto customer = userServiceClient.getUserId(xAuthToken);
//        return responseService.getSingleResult(chatService.createChatRoom(customer,store));
//    }
//
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
