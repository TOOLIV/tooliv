package com.tooliv.server.domain.chat.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatRoomEnterRequestDTO")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class ChatRoomEnterRequestDTO {

    @ApiModelProperty(name = "채팅방 ID")
    private String roomId;
}
