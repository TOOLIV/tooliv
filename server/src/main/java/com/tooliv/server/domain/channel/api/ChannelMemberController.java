package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "ChannelMembers API", tags = {"Channel Members"})
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
    public ResponseEntity<? extends BaseResponseDTO> registerChannelMember(
        @RequestBody @ApiParam(value = "채널멤버 등록 정보", required = true) RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        try {
            channelMemberService.addChannelMember(registerChannelMemberRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 등록 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널멤버 등록 완료"));
    }

    @DeleteMapping
    @ApiOperation(value = "채널 멤버 삭제")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채널멤버 삭제 완료"),
        @ApiResponse(code = 409, message = "채널멤버 삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteChannelMember(
        @RequestBody @ApiParam(value = "채널멤버 등록 삭제", required = true) DeleteChannelMemberRequestDTO deleteChannelMemberRequestDTO) {
        try {
            channelMemberService.deleteChannelMember(deleteChannelMemberRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 삭제 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널멤버 삭제 완료"));
    }

    @GetMapping("/list/{channelId}")
    @ApiOperation(value = "채널멤버 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "채널멤버 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelMemberList(
        @PathVariable("channelId") @ApiParam(value="채널 ID", required=true) String channelId) {
        ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO = null;

        try {
            channelMemberListGetResponseDTO = channelMemberService.getChannelMemberList(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 채널멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(ChannelMemberListGetResponseDTO.of("채널멤버 목록 조회 완료", channelMemberListGetResponseDTO));
    }

}
