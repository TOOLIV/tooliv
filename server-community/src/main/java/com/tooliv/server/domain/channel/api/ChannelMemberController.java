package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelInfoGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberCodeGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "ChannelMembers API", tags = {"Channel Members"})
@RequiredArgsConstructor
@RequestMapping("/api/channel/{channelId}/member")
public class ChannelMemberController {

    private final ChannelMemberService channelMemberService;

    @PostMapping
    @ApiOperation(value = "채널 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채널멤버 등록 완료"),
        @ApiResponse(code = 409, message = "채널멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerChannelMember(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestBody @ApiParam(value = "채널멤버 등록 정보", required = true) RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        try {
            channelMemberService.addChannelMember(channelId, registerChannelMemberRequestDTO);
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
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "이메일", required = true) String email) {
        try {
            channelMemberService.deleteChannelMember(channelId, email);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 삭제 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널멤버 삭제 완료"));
    }

    @GetMapping("/search")
    @ApiOperation(value = "채널 내 멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 검색 완료"),
        @ApiResponse(code = 404, message = "검색 가능한 채널멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "채널멤버 검색 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchChannelMemberList(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO = null;

        try {
            channelMemberListGetResponseDTO = channelMemberService.searchChannelMember(channelId, keyword, seq);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널멤버 검색 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 채널멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(ChannelMemberListGetResponseDTO.of("채널멤버 검색 완료", channelMemberListGetResponseDTO));
    }

    @GetMapping("/list")
    @ApiOperation(value = "채널멤버 등록을 위한 멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 검색 완료"),
        @ApiResponse(code = 404, message = "검색 가능한 채널멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "채널멤버 검색 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchChannelMemberListForRegister(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO = null;

        try {
            channelMemberListGetResponseDTO = channelMemberService.searchChannelMemberForRegister(channelId, keyword, seq);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 멤버 검색 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 채널멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(ChannelMemberListGetResponseDTO.of("채널멤버 검색 완료", channelMemberListGetResponseDTO));
    }

    @GetMapping("/code")
    @ApiOperation(value = "채널멤버 코드 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 코드 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "채널멤버 코드 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelMemberCode(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId) {
        ChannelMemberCodeGetResponseDTO channelMemberCodeGetResponseDTO = null;
        try {
            channelMemberCodeGetResponseDTO = channelMemberService.getChannelMemberCode(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("조회된 채널멤버 정보가 없음"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 채널멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(ChannelMemberCodeGetResponseDTO.of("채널멤버 코드 조회 완료", channelMemberCodeGetResponseDTO));
    }

    @GetMapping("/info")
    @ApiOperation(value = "채널명 및 채널인원수 정보 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널명 및 채널인원수 정보 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
        @ApiResponse(code = 409, message = "채널명 및 채널인원수 정보 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelInfo(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId) {
        ChannelInfoGetResponseDTO channelInfoGetResponseDTO = null;
        try {
            channelInfoGetResponseDTO = channelMemberService.getChannelInfo(channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("조회된 채널정보가 없음"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 채널정보가 없음"));
        }
        return ResponseEntity.status(200).body(ChannelInfoGetResponseDTO.of("채널명 및 채널인원수 정보 조회 완료", channelInfoGetResponseDTO));
    }

}
