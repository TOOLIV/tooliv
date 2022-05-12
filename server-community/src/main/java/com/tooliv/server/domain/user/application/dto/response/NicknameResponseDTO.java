package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel("NicknameResponseDTO")
@Getter
@Builder
public class NicknameResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("수정된 닉네임")
    private String nickname;

    public static NicknameResponseDTO of(String message, NicknameResponseDTO nicknameResponseDTO) {
        nicknameResponseDTO.setMessage(message);

        return nicknameResponseDTO;
    }
}
