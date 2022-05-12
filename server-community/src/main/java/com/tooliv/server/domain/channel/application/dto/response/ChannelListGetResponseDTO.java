package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
@ApiModel("ChannelListGetResponseDTO")
public class ChannelListGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("채널 목록")
    private List<ChannelGetResponseDTO> channelGetResponseDTOList;

    public ChannelListGetResponseDTO() {
    }

    public ChannelListGetResponseDTO(List<ChannelGetResponseDTO> channelGetResponseDTOList) {
        this.channelGetResponseDTOList = channelGetResponseDTOList;
    }

    public static ChannelListGetResponseDTO of(String message, ChannelListGetResponseDTO channelListGetResponseDTO) {
        channelListGetResponseDTO.setMessage(message);

        return channelListGetResponseDTO;
    }

}
