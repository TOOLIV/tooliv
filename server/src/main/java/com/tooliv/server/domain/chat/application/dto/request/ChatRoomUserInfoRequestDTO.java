package com.tooliv.server.domain.chat.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatRoomUserInfoRequestDTO")
@NoArgsConstructor
@Getter
public class ChatRoomUserInfoRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "이메일")
    private String email;
}
