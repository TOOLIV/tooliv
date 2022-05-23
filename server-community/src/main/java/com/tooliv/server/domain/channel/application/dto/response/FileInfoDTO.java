package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@ApiModel("FileInfoDTO")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FileInfoDTO {
    @ApiModelProperty("파일 id")
    private String fileId;

    @ApiModelProperty("사용자 닉네임")
    private String sender;

    @ApiModelProperty("파일 이름")
    private String fileName;

    @ApiModelProperty("파일 URL")
    private String fileUrl;

    @ApiModelProperty("보낸시간")
    private LocalDateTime sendTime;

}
