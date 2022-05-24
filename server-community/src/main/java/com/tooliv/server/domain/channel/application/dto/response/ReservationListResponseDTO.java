package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ReservationListResponseDTO")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReservationListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("예약 메세징 목록")
    private List<ReservationResponseDTO> reservationResponseDTOList;

    public static ReservationListResponseDTO of(String message, ReservationListResponseDTO reservationListResponseDTO) {
        reservationListResponseDTO.setMessage(message);

        return reservationListResponseDTO;
    }
}
