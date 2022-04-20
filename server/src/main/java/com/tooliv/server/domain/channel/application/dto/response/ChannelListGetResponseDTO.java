package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
