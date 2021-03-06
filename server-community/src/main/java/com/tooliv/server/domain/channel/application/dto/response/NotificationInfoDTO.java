package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("NotificationInfoDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NotificationInfoDTO {

    @ApiModelProperty("채널 List 목록")
    private String channelId;

    @ApiModelProperty("워크스페이스 List 목록")
    private String workspaceId;

    @ApiModelProperty("알람 List 목록")
    private boolean notificationRead;
}
