package com.tooliv.server.domain.channel.application.dto.response;

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
@ApiModel("RegisterChannelResponseDTO")
public class RegisterChannelResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("채널 ID")
    private String id;

    public static RegisterChannelResponseDTO of(String message, RegisterChannelResponseDTO registerChannelResponseDTO) {
        registerChannelResponseDTO.setMessage(message);
        return registerChannelResponseDTO;
    }

}
