package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "ChannelMembers API", tags = {"ChannelMembers"})
@RequiredArgsConstructor
@RequestMapping("/api/channel-member")
public class ChannelMemberController {

    private final ChannelMemberService channelMemberService;

    @PostMapping
    @ApiOperation(value = "채널 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채널멤버 등록 완료"),
        @ApiResponse(code = 409, message = "채널멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerChannel(
        @RequestBody @ApiParam(value = "채널멤버 등록 정보", required = true) RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        try {
            channelMemberService.addChannelMember(registerChannelMemberRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 등록 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널멤버 등록 완료"));
    }

}
