package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import com.tooliv.server.global.common.BaseResponseDTO;
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
@ApiModel("ChannelInfoGetResponseDTO")
public class ChannelInfoGetResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("채널 이름")
    private String name;

    @ApiModelProperty("채널 인원")
    private long numOfPeople;


    @ApiModelProperty("채널 코드")
    private ChannelCode channelCode;

    public static ChannelInfoGetResponseDTO of(String message, ChannelInfoGetResponseDTO channelInfoGetResponseDTO){
        channelInfoGetResponseDTO.setMessage(message);
        return  channelInfoGetResponseDTO;
    }
}
