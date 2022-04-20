package com.tooliv.server.domain.chat.application.dto.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("ChatRoomInfoDTO")
public class ChatRoomInfoDTO {

    @ApiModelProperty(name = "채팅방 ID")
    private String roomId;

    @ApiModelProperty(name = "채팅방 name")
    private String roomName;

    public ChatRoomInfoDTO() {
    }

    public ChatRoomInfoDTO(String roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

}
