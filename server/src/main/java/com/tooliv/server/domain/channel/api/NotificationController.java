package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.NotificationService;
import com.tooliv.server.domain.channel.application.dto.response.DirectListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.NotificationListResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "Notification API", tags = {"Notification"})
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/list/{email}")
    @ApiOperation(value = "알람 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "알람 목록 조회 완료"),
        @ApiResponse(code = 409, message = "알람 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelNotificationList(@PathVariable String email) {
        NotificationListResponseDTO notificationListResponseDTO = null;

        try {
            notificationListResponseDTO = notificationService.getNotificationList(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("알람 목록 조회 실패"));
        } catch (Exception e) {
        }

        return ResponseEntity.status(200).body(NotificationListResponseDTO.of("알람 목록 조회 실패", notificationListResponseDTO));
    }

}
