package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
@ApiModel("ChannelMemberListGetResponseDTO")
public class ChannelMemberListGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("채널멤버 목록")
    private List<ChannelMemberGetResponseDTO> channelMemberGetResponseDTOList;

    public ChannelMemberListGetResponseDTO() {
    }

    public ChannelMemberListGetResponseDTO(List<ChannelMemberGetResponseDTO> channelMemberGetResponseDTOList) {
        this.channelMemberGetResponseDTOList = channelMemberGetResponseDTOList;
    }

    public static ChannelMemberListGetResponseDTO of(String message, ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO) {
        channelMemberListGetResponseDTO.setMessage(message);

        return channelMemberListGetResponseDTO;
    }

}
