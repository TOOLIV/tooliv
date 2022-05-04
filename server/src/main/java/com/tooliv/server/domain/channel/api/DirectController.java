package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.NotificationService;
import com.tooliv.server.domain.channel.application.dto.response.ChatRoomChatListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectListResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "Direct API", tags = {"Direct"})
@RequiredArgsConstructor
@RequestMapping("/api/direct")
public class DirectController {

    private final NotificationService notificationService;

    @GetMapping("/{email}")
    @ApiOperation(value = "개인 메시지 정보 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "개인 메시지 알람 목록 조회 완료"),
        @ApiResponse(code = 409, message = "개인 메시지 알람 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getDirectNotificationList(@PathVariable String email) {
        DirectListResponseDTO directListResponseDTO = null;

        try {
            directListResponseDTO = notificationService.getDirectNotificationList(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("개인 메시지 알람 목록 조회 실패"));
        } catch (Exception e) {
        }

        return ResponseEntity.status(200).body(DirectListResponseDTO.of("개인 메시지 알람 목록 조회 실패", directListResponseDTO));
    }

}
