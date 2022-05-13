package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("StatusListResponseDTO")
@NoArgsConstructor
@Getter
public class StatusListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 상태 목록")
    private List<StatusResponseDTO> statusResponseDTOList;

    public StatusListResponseDTO(List<StatusResponseDTO> statusResponseDTOList) {
        this.statusResponseDTOList = statusResponseDTOList;
    }

    public static StatusListResponseDTO of(String message, StatusListResponseDTO statusListResponseDTO) {
        statusListResponseDTO.setMessage(message);

        return statusListResponseDTO;
    }

}
