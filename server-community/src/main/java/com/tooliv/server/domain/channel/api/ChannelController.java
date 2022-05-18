package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberDeleteResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelInfoGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberCodeGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelMemberListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.RegisterChannelResponseDTO;
import com.tooliv.server.domain.channel.execption.ChannelMemberNotFoundException;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.workspace.exception.WorkspaceNotFoundException;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.UserNotFoundException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin("*")
@Api(value = "Channel API", tags = {"Channel"})
@RequiredArgsConstructor
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;

    private final ChannelMemberService channelMemberService;

    @PostMapping
    @ApiOperation(value = "채널 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채널 등록 완료"),
        @ApiResponse(code = 404, message = "채널 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerChannel(
        @RequestBody @ApiParam(value = "채널등록 정보", required = true) RegisterChannelRequestDTO registerChannelRequestDTO) {
        RegisterChannelResponseDTO registerChannelResponseDTO = null;
        try {
            registerChannelResponseDTO = channelService.registerChannel(registerChannelRequestDTO);
        } catch (UserNotFoundException | WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(RegisterChannelResponseDTO.of("채널 등록 완료", registerChannelResponseDTO));
    }

    @PatchMapping
    @ApiOperation(value = "채널 변경 , 필수 정보 - 채널ID, 채널명")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 변경에 성공했습니다."),
        @ApiResponse(code = 404, message = "채널 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> modifyChannel(
        @RequestBody @ApiParam(value = "수정할 채널 정보", required = true) ModifyChannelRequestDTO modifyChannelRequestDTO) {

        try {
            channelService.modifyChannel(modifyChannelRequestDTO);
        } catch (ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채널 변경에 성공했습니다."));
    }

    @DeleteMapping("/{channelId}")
    @ApiOperation(value = "채널 삭제")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 삭제에 성공했습니다."),
        @ApiResponse(code = 404, message = "해당 채널을 찾을 수 없습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteChannel(
        @PathVariable("channelId") @ApiParam(value = "채널 ID", required = true) String channelId) {
        try {
            channelService.deleteChannel(channelId);
        } catch (ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채널 삭제에 성공했습니다."));
    }

    @GetMapping("/list/{workspaceId}")
    @ApiOperation(value = "채널 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelList(
        @PathVariable("workspaceId") @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId) {
        ChannelListGetResponseDTO channelListGetResponseDTO = null;
        try {
            channelListGetResponseDTO = channelService.getChannelList(workspaceId);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelListGetResponseDTO.of("채널 목록 조회 완료", channelListGetResponseDTO));
    }

    @GetMapping("/list/public/{workspaceId}")
    @ApiOperation(value = "채널 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getPublicChannelList(
        @PathVariable("workspaceId") @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId) {
        ChannelListGetResponseDTO channelListGetResponseDTO = null;
        try {
            channelListGetResponseDTO = channelService.getPublicChannelList(workspaceId);
        } catch (UserNotFoundException | ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelListGetResponseDTO.of("채널 목록 조회 완료", channelListGetResponseDTO));
    }

    @PostMapping("/{channelId}/member")
    @ApiOperation(value = "채널 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "채널멤버 등록 완료"),
        @ApiResponse(code = 404, message = "채널멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerChannelMember(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestBody @ApiParam(value = "채널멤버 등록 정보", required = true) RegisterChannelMemberRequestDTO registerChannelMemberRequestDTO) {
        try {
            channelMemberService.addChannelMember(channelId, registerChannelMemberRequestDTO);
        } catch (ChannelNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널멤버 등록 완료"));
    }

    @DeleteMapping("/{channelId}/member")
    @ApiOperation(value = "채널 멤버 삭제")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 삭제 완료"),
        @ApiResponse(code = 404, message = "채널멤버 삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteChannelMember(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "이메일", required = true) String email) {
        ChannelMemberDeleteResponseDTO channelMemberDeleteResponseDTO = null;

        try {
            channelMemberDeleteResponseDTO = channelMemberService.deleteChannelMember(channelId, email);
        } catch (UserNotFoundException | ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelMemberDeleteResponseDTO.of("채널멤버 삭제 완료", channelMemberDeleteResponseDTO));
    }

    @GetMapping("/{channelId}/member/search")
    @ApiOperation(value = "채널 내 멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 검색 완료"),
        @ApiResponse(code = 404, message = "채널 정보가 존재하지 않습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchChannelMemberList(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO = null;
        try {
            channelMemberListGetResponseDTO = channelMemberService.searchChannelMember(channelId, keyword, seq);
        } catch (ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelMemberListGetResponseDTO.of("채널멤버 검색 완료", channelMemberListGetResponseDTO));
    }

    @GetMapping("/{channelId}/member/list")
    @ApiOperation(value = "채널멤버 등록을 위한 멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 검색 완료"),
        @ApiResponse(code = 404, message = "검색 가능한 채널멤버 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchChannelMemberListForRegister(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        ChannelMemberListGetResponseDTO channelMemberListGetResponseDTO = null;
        try {
            channelMemberListGetResponseDTO = channelMemberService.searchChannelMemberForRegister(channelId, keyword, seq);
        } catch (ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelMemberListGetResponseDTO.of("채널멤버 검색 완료", channelMemberListGetResponseDTO));
    }

    @GetMapping("/{channelId}/member/code")
    @ApiOperation(value = "채널멤버 코드 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널멤버 코드 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널멤버 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelMemberCode(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId) {
        ChannelMemberCodeGetResponseDTO channelMemberCodeGetResponseDTO = null;
        try {
            channelMemberCodeGetResponseDTO = channelMemberService.getChannelMemberCode(channelId);
        } catch (UserNotFoundException | ChannelNotFoundException | ChannelMemberNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelMemberCodeGetResponseDTO.of("채널멤버 코드 조회 완료", channelMemberCodeGetResponseDTO));
    }

    @GetMapping("/{channelId}/member/info")
    @ApiOperation(value = "채널명 및 채널인원수 정보 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널명 및 채널인원수 정보 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelInfo(
        @PathVariable("channelId") @Valid @ApiParam(value = "채널 ID", required = true) String channelId) {
        ChannelInfoGetResponseDTO channelInfoGetResponseDTO = null;
        try {
            channelInfoGetResponseDTO = channelMemberService.getChannelInfo(channelId);
        } catch (ChannelNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(ChannelInfoGetResponseDTO.of("채널명 및 채널인원수 정보 조회 완료", channelInfoGetResponseDTO));
    }
}
