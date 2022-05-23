package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.dto.request.ReservationCreateRequestDTO;
import com.tooliv.server.domain.channel.application.reservationService.ReservationService;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.UserNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@Api(value = "Reservation API", tags = {"Reservation"})
@RequiredArgsConstructor
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    @ApiOperation(value = "예약 메세징 등록")
    public ResponseEntity<? extends BaseResponseDTO> createReservation(
        @ApiParam(value = "이미지") @RequestPart List<MultipartFile> multipartFiles,
        @ApiParam(value = "예약 메세징 정보", required = true) @Valid @RequestPart ReservationCreateRequestDTO reservationCreateRequestDTO) {
        try {
            reservationService.createReservation(multipartFiles, reservationCreateRequestDTO);
        } catch (UserNotFoundException | ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("예약 메세징 등록 완료"));
    }

}
