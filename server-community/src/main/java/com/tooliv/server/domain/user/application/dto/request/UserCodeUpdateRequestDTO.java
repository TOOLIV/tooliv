package com.tooliv.server.domain.user.application.dto.request;

import com.tooliv.server.domain.user.domain.enums.UserCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("UserCodePatchRequestDTO")
@NoArgsConstructor
@Getter
public class UserCodeUpdateRequestDTO {

    @NotBlank
    @Email
    @ApiModelProperty("이메일")
    private String email;

    @NotNull
    @ApiModelProperty("유저 코드")
    private UserCode userCode;
}
