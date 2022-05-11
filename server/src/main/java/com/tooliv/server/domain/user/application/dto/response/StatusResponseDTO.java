package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@ApiModel("StatusResponseDTO")
@Getter
@Builder
public class StatusResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 상태 목록")
    private List<StatusCode> statusCodeList;

    public static StatusResponseDTO of(String message, StatusResponseDTO statusResponseDTO) {
        statusResponseDTO.setMessage(message);

        return statusResponseDTO;
    }

}
