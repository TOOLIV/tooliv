package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("DirectChatListResponseDTO")
@Getter
public class DirectChatListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 정보 목록")
    private List<ChatDirectDTO> directInfoDTOList;

    public DirectChatListResponseDTO() {
    }

    public DirectChatListResponseDTO(List<ChatDirectDTO> directInfoDTOList) {
        this.directInfoDTOList = directInfoDTOList;
    }

    public static DirectChatListResponseDTO of(String message, DirectChatListResponseDTO directChatListResponseDTO) {
        directChatListResponseDTO.setMessage(message);

        return directChatListResponseDTO;
    }
}
