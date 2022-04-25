package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ApiModel("ChannelMemberGetResponseDTO")
public class ChannelMemberGetResponseDTO {

    @ApiModelProperty("user 이메일")
    private String email;

    @ApiModelProperty("user 이름")
    private String name;

    @ApiModelProperty("user 닉네임")
    private String nickname;

    @ApiModelProperty("채널멤버 코드")
    private ChannelMemberCode channelMemberCode;

}
