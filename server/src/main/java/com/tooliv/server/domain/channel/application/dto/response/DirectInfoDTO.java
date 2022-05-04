package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("NotificationDirectInfoDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DirectInfoDTO {
    @ApiModelProperty("프로필 이미지 목록")
    private String profileImage;

    @ApiModelProperty("상대방 닉네임 목록")
    private String receiveName;

    @ApiModelProperty("채널 List 목록")
    private String channelId;

    @ApiModelProperty("알람 List 목록")
    private boolean notificationRead;
}
