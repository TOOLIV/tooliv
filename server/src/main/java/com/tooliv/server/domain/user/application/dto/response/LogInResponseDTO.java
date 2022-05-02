package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel("LogInResponseDto")
@Getter
@Builder
public class LogInResponseDTO extends BaseResponseDTO {

    @ApiModelProperty(name = "유저 ID")
    private String userId;

    @ApiModelProperty(name = "이름")
    private String name;

    @ApiModelProperty(name = "이메일")
    private String email;

    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @ApiModelProperty(name = "회원 코드")
    private UserCode userCode;

    @ApiModelProperty(name = "프로필 이미지")
    private String profileImage;

    @ApiModelProperty(name = "AccessToken")
    private String accessToken;

    public static LogInResponseDTO of(String message, LogInResponseDTO logInResponseDTO) {
        logInResponseDTO.setMessage(message);

        return logInResponseDTO;
    }


}
