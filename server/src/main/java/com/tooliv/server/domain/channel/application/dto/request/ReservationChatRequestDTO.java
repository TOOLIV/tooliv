package com.tooliv.server.domain.channel.application.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@ApiModel("ReservationChatRequestDTO")
@NoArgsConstructor
@Getter
public class ReservationChatRequestDTO {

    @ApiModelProperty(name = "메세지 ID")
    private long chatId;

    @ApiModelProperty(name = "채널 ID")
    private String channelId;

    @ApiModelProperty(name = "보낸사람 Id")
    private String userId;

    @ApiModelProperty(name = "받는사람 email")
    private String email;

    @ApiModelProperty(name = "보낼 메세지 내용")
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @ApiModelProperty(name = "보낼 시간")
    private LocalDateTime sendTime;

    @ApiModelProperty(name = "파일")
    private List<String> files;

    @ApiModelProperty(name = "파일 이름")
    private List<String> originFiles;

    public void updateChatId(long chatId) {
        this.chatId = chatId;
    }
}
