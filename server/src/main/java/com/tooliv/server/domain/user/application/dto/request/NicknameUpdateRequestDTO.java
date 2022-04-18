package com.tooliv.server.domain.user.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("NicknameUpdateRequestDTO")
@NoArgsConstructor
@Getter
public class NicknameUpdateRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty("수정할 닉네임")
    private String nickname;
}
