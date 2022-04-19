package com.tooliv.server.domain.chat.application.dto.request;

import com.tooliv.server.domain.chat.domain.ChatMessage;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatRequestDTO")
@NoArgsConstructor
@Getter
public class ChatRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "채팅방 ID")
    private String roomId;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "보낸사람 name")
    private String sender;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "내용")
    private String contents;

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "메시지 타입")
    private ChatMessage.MessageType type;
}
