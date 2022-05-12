package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("ChatRoomChatListResponseDTO")
@Getter
public class ChatRoomChatListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 정보 목록")
    private List<ChatRequestDTO> chatMessageDTOList;

    public ChatRoomChatListResponseDTO() {
    }

    public ChatRoomChatListResponseDTO(List<ChatRequestDTO> chatMessageDTOList) {
        this.chatMessageDTOList = chatMessageDTOList;
    }

    public static ChatRoomChatListResponseDTO of(String message, ChatRoomChatListResponseDTO chatRoomChatListResponseDTO) {
        chatRoomChatListResponseDTO.setMessage(message);

        return chatRoomChatListResponseDTO;
    }
}
