package com.tooliv.server.domain.channel.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ReservationResponseDTO")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReservationResponseDTO {

    @ApiModelProperty("예약 메세징 ID")
    private String reservationId;

    @ApiModelProperty("예약자 ID")
    private String userId;

    @ApiModelProperty("내용")
    private String content;

    @ApiModelProperty("전송 시간")
    private LocalDateTime sendTime;

    @ApiModelProperty("생성 시간")
    private LocalDateTime created_at;

}
