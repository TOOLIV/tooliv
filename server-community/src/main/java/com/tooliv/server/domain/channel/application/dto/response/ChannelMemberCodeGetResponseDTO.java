package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@ApiModel("ChannelMemberCodeGetResponseDTO")
public class ChannelMemberCodeGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("채널멤버 ID")
    private ChannelMemberCode channelMemberCode;

    public ChannelMemberCodeGetResponseDTO(ChannelMemberCode channelMemberCode) {
        this.channelMemberCode = channelMemberCode;
    }

    public static ChannelMemberCodeGetResponseDTO of(String message, ChannelMemberCodeGetResponseDTO channelMemberCodeGetResponseDTO) {
        channelMemberCodeGetResponseDTO.setMessage(message);
        return channelMemberCodeGetResponseDTO;
    }
}
