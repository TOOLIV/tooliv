package com.tooliv.server.domain.user.application.dto.request;

import com.tooliv.server.domain.user.domain.enums.UserCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("SignUpReqeustDTO")
@NoArgsConstructor
@Getter
public class SignUpRequestDTO {

    @NotBlank
    @Email
    @ApiModelProperty(name = "이메일")
    private String email;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "이름")
    private String name;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "비밀번호")
    private String password;

    @NotNull
    @ApiModelProperty(name = "유저 코드")
    private UserCode userCode;
}
