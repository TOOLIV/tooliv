package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@ApiModel("DeleteChannelMemberRequestDTO")
@NoArgsConstructor
@Getter
public class DeleteChannelMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "email")
    private String email;

}