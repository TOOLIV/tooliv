package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("NotificationListResponseDTO")
@Getter
public class NotificationListResponseDTO extends BaseResponseDTO {
    @ApiModelProperty("알람 List 목록")
    private List<String> notificationChannelList;

    public NotificationListResponseDTO() {
    }

    public NotificationListResponseDTO(List<String> notificationChannelList) {
        this.notificationChannelList = notificationChannelList;
    }

    public static NotificationListResponseDTO of(String message, NotificationListResponseDTO notificationListResponseDTO) {
        notificationListResponseDTO.setMessage(message);

        return notificationListResponseDTO;
    }
}
