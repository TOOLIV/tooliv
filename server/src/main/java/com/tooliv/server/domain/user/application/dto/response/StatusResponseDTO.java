package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("StatusResponseDTO")
@NoArgsConstructor
@Getter
public class StatusResponseDTO {

    @ApiModelProperty("이메일")
    private String email;

    @ApiModelProperty("회원 상태 목록")
    private StatusCode statusCode;

    public StatusResponseDTO(String email, StatusCode statusCode) {
        this.email = email;
        this.statusCode = statusCode;
    }

}
