package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.dto.request.ReservationCreateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ReservationListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.WebhookListResponseDTO;
import com.tooliv.server.domain.channel.application.reservationService.ReservationService;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.channel.execption.WebhookNotFoundException;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
        @ApiParam(value = "이미지") @RequestPart(required = false) List<MultipartFile> multipartFiles,
        @ApiParam(value = "예약 메세징 정보", required = true) @Valid @RequestPart ReservationCreateRequestDTO reservationCreateRequestDTO) {
        try {
            reservationService.createReservation(multipartFiles, reservationCreateRequestDTO);
        } catch (UserNotFoundException | ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("예약 메세징 등록 완료"));
    }

    @GetMapping("list/{channelId}")
    @ApiOperation(value = "예약 메세징 - 목록 조회")
    public ResponseEntity<? extends BaseResponseDTO> getReservationList(
        @PathVariable("channelId") @ApiParam(value = "채널 ID", required = true) String channelId) {
        ReservationListResponseDTO reservationListResponseDTO = null;
        try {
            reservationListResponseDTO = reservationService.getReservationList(channelId);
        } catch (ChannelNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(ReservationListResponseDTO.of("예약 메세징 목록 조회 완료", reservationListResponseDTO));
    }

    @DeleteMapping
    @ApiOperation(value = "예약 메세징 삭제")
    public ResponseEntity<? extends BaseResponseDTO> deleteReservation(
        @ApiParam(value = "삭제할 예약 메세징 ID", required = true) @RequestParam String reservationId) {
        try {
            reservationService.deleteReservation(reservationId);
        } catch (WebhookNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(204).body(null);
    }

}
