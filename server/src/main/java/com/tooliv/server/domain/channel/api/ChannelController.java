package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.user.application.UserService;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@Api(value = "Channel API", tags = {"Channel"})
@RequiredArgsConstructor
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping
    @ApiOperation(value = "채널 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "채널 등록 완료"),
            @ApiResponse(code = 409, message = "채널 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> signUp(
            @RequestBody @Valid @ApiParam(value = "채널등록 정보", required = true) RegisterChannelRequestDTO registerChannelRequestDTO) {
        try {
            channelService.registerChannel(registerChannelRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 등록 실패"));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널 등록 완료"));
    }

}
