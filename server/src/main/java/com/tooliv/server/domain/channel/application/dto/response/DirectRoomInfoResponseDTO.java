package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("DirectRoomInfoResponseDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DirectRoomInfoResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("Direct Chat Room Id")
    private String roomId;

    public static DirectRoomInfoResponseDTO of(String message, DirectRoomInfoResponseDTO directRoomInfoResponseDTO){
        directRoomInfoResponseDTO.setMessage(message);
        return  directRoomInfoResponseDTO;
    }
}
