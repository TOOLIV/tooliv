package com.tooliv.server.domain.user.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("UserInfoResponseDTO")
public class UserInfoResponseDTO {

    @ApiModelProperty("회원 ID")
    private String id;

    @ApiModelProperty("회원 이메일")
    private String email;

    @ApiModelProperty("회원 이름")
    private String name;

    @ApiModelProperty("회원 닉네임")
    private String nickname;

    public UserInfoResponseDTO() {
    }

    public UserInfoResponseDTO(String id, String email, String name, String nickname) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
    }
}
