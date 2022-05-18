package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ApiModel("ChannelDeleteResponseDTO")
public class ChannelMemberDeleteResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("공지사항 채널 ID")
    private String defaultChannelId;

    public static ChannelMemberDeleteResponseDTO of(String message, ChannelMemberDeleteResponseDTO channelMemberDeleteResponseDTO) {
        channelMemberDeleteResponseDTO.setMessage(message);

        return channelMemberDeleteResponseDTO;
    }
}
