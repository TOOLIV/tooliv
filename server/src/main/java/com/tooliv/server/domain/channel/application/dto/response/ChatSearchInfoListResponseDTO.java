package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("ChatSearchInfoListResponseDTO")
@Getter
public class ChatSearchInfoListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 정보 목록")
    private List<ChatSearchInfoDTO> chatSearchInfoDTOList;

    public ChatSearchInfoListResponseDTO() {
    }

    public ChatSearchInfoListResponseDTO(List<ChatSearchInfoDTO> chatSearchInfoDTOList) {
        this.chatSearchInfoDTOList = chatSearchInfoDTOList;
    }

    public static ChatSearchInfoListResponseDTO of(String message, ChatSearchInfoListResponseDTO chatSearchInfoListResponseDTO) {
        chatSearchInfoListResponseDTO.setMessage(message);

        return chatSearchInfoListResponseDTO;
    }
}
