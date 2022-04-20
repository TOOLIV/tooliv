package com.tooliv.server.domain.chat.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("ChatResponseDTO")
@Getter
public class ChatRoomListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 정보 목록")
    private List<ChatRoomInfoDTO> chatRoomListResponseDTO;

    public ChatRoomListResponseDTO() {
    }

    public ChatRoomListResponseDTO(List<ChatRoomInfoDTO> chatRoomListResponseDTO) {
        this.chatRoomListResponseDTO = chatRoomListResponseDTO;
    }

    public static ChatRoomListResponseDTO of(String message, ChatRoomListResponseDTO chatRoomListResponseDTO) {
        chatRoomListResponseDTO.setMessage(message);

        return chatRoomListResponseDTO;
    }

}
