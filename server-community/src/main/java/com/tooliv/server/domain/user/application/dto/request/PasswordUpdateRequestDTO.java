package com.tooliv.server.domain.user.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("PasswordUpdateRequestDTO")
@NoArgsConstructor
@Getter
public class PasswordUpdateRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty("수정할 비밀번호")
    private String password;

}
