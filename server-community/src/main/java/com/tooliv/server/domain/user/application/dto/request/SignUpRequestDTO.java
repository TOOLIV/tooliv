package com.tooliv.server.domain.user.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("SignUpReqeustDTO")
@NoArgsConstructor
@AllArgsConstructor
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
    @ApiModelProperty(name = "비밀번호")
    private String password;
}
