package com.tooliv.server.domain.channel.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("RegisterChannelMemberRequestDTO")
@NoArgsConstructor
@Getter
public class RegisterChannelMemberRequestDTO {

    @NotNull
    @ApiModelProperty(name = "email 목록")
    private List<String> emailList;

}