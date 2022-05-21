package com.tooliv.server.domain.channel.application.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@ApiModel("ReservationCreateRequestDTO")
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class ReservationCreateRequestDTO {

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "채널 ID")
    private String channelId;

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "보낼 메세지 내용")
    private String content;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @ApiModelProperty(name = "보낼 시간")
    private LocalDateTime sendTime;

    @ApiModelProperty(name = "메시지 타입")
    private String type;

    @ApiModelProperty(name = "파일")
    private List<String> files;

    @ApiModelProperty(name = "파일 이름")
    private List<String> originFiles;

}
