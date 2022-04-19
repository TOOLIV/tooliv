package com.tooliv.server.domain.user.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("UserInfoResponseDTO")
public class UserInfoResponseDTO {

    @ApiModelProperty("회원 ID")
    private String id;

    @ApiModelProperty("회원 닉네임")
    private String nickname;

    public UserInfoResponseDTO() {
    }

    public UserInfoResponseDTO(String id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
