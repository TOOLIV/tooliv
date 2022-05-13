package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
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
@ApiModel("ChannelGetResponseDTO")
public class ChannelGetResponseDTO {

    @ApiModelProperty("채널 ID")
    private String id;

    @ApiModelProperty("채널 이름")
    private String name;

    @ApiModelProperty("공개 여부")
    private boolean privateYn;

    @ApiModelProperty("채널 코드")
    private ChannelCode channelCode;

}
