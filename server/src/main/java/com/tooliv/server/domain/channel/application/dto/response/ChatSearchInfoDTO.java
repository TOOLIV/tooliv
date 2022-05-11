package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("ChatSearchInfoDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ChatSearchInfoDTO {

    @ApiModelProperty("프로필 이미지 목록")
    private long chatId;

    @ApiModelProperty("채널 List 목록")
    private String channelId;

    @ApiModelProperty("채팅 내용")
    private String contents;

}
