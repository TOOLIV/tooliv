package com.tooliv.server.global.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("BaseResponseDTO")
@Setter
@Getter
public class BaseResponseDTO {

    @ApiModelProperty(name = "응답 메시지", example = "성공")
    String message;

    public BaseResponseDTO() {
    }

    public BaseResponseDTO(String message) {
        this.message = message;
    }

    public static BaseResponseDTO of(String message) {
        return new BaseResponseDTO(message);
    }

}
