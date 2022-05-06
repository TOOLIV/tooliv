package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("DirectListResponseDTO")
@Getter
public class DirectListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("개인 메시지 알람 목록")
    private List<DirectInfoDTO> directInfoDTOList;

    public DirectListResponseDTO() {
    }

    public DirectListResponseDTO(List<DirectInfoDTO> directInfoDTOList) {
        this.directInfoDTOList = directInfoDTOList;
    }

    public static DirectListResponseDTO of(String message, DirectListResponseDTO notificationDirectInfoDTOList) {
        notificationDirectInfoDTOList.setMessage(message);

        return notificationDirectInfoDTOList;
    }
}
