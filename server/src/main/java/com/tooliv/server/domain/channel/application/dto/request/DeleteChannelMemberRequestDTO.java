package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("DeleteChannelMemberRequestDTO")
@NoArgsConstructor
@Getter
public class DeleteChannelMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "email")
    private String email;

}