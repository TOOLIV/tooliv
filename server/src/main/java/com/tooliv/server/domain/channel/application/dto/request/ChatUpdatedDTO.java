package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatUpdatedDTO")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class ChatUpdatedDTO {

    @ApiModelProperty(name = "메시지 ID")
    private long chatId;

    @ApiModelProperty(name = "email")
    private String email;

    @ApiModelProperty(name = "채팅방 ID")
    private String channelId;

    @ApiModelProperty(name = "메시지 타입")
    private String type;
}
