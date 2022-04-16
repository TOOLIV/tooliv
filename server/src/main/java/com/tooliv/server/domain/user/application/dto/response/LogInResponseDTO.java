package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.UserCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel("LogInResponseDto")
@Getter
public class LogInResponseDTO {

    @ApiModelProperty(name = "이메일")
    private String email;

    @ApiModelProperty(name = "이름")
    private String name;

    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @ApiModelProperty(name = "회원 코드")
    private UserCode userCode;

    @ApiModelProperty(name = "AccessToken")
    private String accessToken;
}
