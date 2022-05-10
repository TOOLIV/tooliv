package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatSearchInfoDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatSearchInfoDTO {

    @ApiModelProperty("프로필 이미지 목록")
    private long chatId;

    @ApiModelProperty("채널 List 목록")
    private String channelId;

    @ApiModelProperty("상대방 닉네임 목록")
    private String contents;

}
