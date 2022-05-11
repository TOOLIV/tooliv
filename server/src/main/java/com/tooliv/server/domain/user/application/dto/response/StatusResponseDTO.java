package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.application.dto.request.StatusRequestDTO;
import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("StatusResponseDTO")
@NoArgsConstructor
@Getter
public class StatusResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 상태 목록")
    private List<StatusCode> statusCodeList;

    public StatusResponseDTO(List<StatusCode> statusCodeList) {
        this.statusCodeList = statusCodeList;
    }

    public static StatusResponseDTO of(String message, StatusResponseDTO statusResponseDTO) {
        statusResponseDTO.setMessage(message);

        return statusResponseDTO;
    }

}
