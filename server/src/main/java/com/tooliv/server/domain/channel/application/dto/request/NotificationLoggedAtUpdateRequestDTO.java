package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("NotificationLoggedAtUpdateRequestDTO")
@NoArgsConstructor
@Getter
public class NotificationLoggedAtUpdateRequestDTO {

    @ApiModelProperty(name = "메시지 ID")
    private long chatId;

    @ApiModelProperty(name = "채팅방 ID")
    private String channelId;

    @ApiModelProperty(name = "보낸사람 Id")
    private String type;
}
