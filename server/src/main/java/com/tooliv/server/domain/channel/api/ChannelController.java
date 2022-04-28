package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChannelListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.RegisterChannelResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
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

    @PostMapping
    @ApiOperation(value = "채널 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "채널 등록 완료"),
            @ApiResponse(code = 409, message = "채널 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerChannel(
            @RequestBody @ApiParam(value = "채널등록 정보", required = true) RegisterChannelRequestDTO registerChannelRequestDTO) {
        RegisterChannelResponseDTO registerChannelResponseDTO = null;
        try {
            registerChannelResponseDTO = channelService.registerChannel(registerChannelRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 등록 실패"));
        }

        return ResponseEntity.status(201).body(RegisterChannelResponseDTO.of("채널 등록 완료", registerChannelResponseDTO));
    }

    @PatchMapping
    @ApiOperation(value="채널 변경 , 필수 정보 - 채널ID, 채널명")
    @ApiResponses({
            @ApiResponse(code=200, message="채널 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 채널을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="채널 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> modifyChannel(
            @RequestBody @ApiParam(value="수정할 채널 정보", required=true) ModifyChannelRequestDTO modifyChannelRequestDTO) {

        try {
            Integer statusCode = channelService.modifyChannel(modifyChannelRequestDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 변경에 실패했습니다."));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 채널을 찾을 수 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("채널 변경에 성공했습니다."));
    }

    @DeleteMapping("/{channelId}")
    @ApiOperation(value="채널 삭제")
    @ApiResponses({
            @ApiResponse(code=200, message="채널 삭제에 성공했습니다."),
            @ApiResponse(code=404, message="해당 채널을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="채널 삭제에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteChannel(
            @PathVariable("channelId") @ApiParam(value="채널 ID", required=true) String channelId) {

        try {
            Integer statusCode = channelService.deleteChannel(channelId);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 삭제에 실패했습니다."));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 채널을 찾을 수 없습니다."));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("채널 삭제에 성공했습니다."));
    }

    @GetMapping("/list/{workspaceId}")
    @ApiOperation(value = "채널 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
        @ApiResponse(code = 409, message = "채널 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelList(
        @PathVariable("workspaceId") @ApiParam(value="워크스페이스 ID", required=true) String workspaceId) {
        ChannelListGetResponseDTO channelListGetResponseDTO = null;

        try {
            channelListGetResponseDTO = channelService.getChannelList(workspaceId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 채널 정보가 없음"));
        }

        return ResponseEntity.status(200).body(ChannelListGetResponseDTO.of("채널 목록 조회 완료", channelListGetResponseDTO));
    }

    @GetMapping("/list/public/{workspaceId}")
    @ApiOperation(value = "채널 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채널 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 채널 정보가 없음"),
        @ApiResponse(code = 409, message = "채널 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getPublicChannelList(
        @PathVariable("workspaceId") @ApiParam(value="워크스페이스 ID", required=true) String workspaceId) {
        ChannelListGetResponseDTO channelListGetResponseDTO = null;

        try {
            channelListGetResponseDTO = channelService.getPublicChannelList(workspaceId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 채널 정보가 없음"));
        }

        return ResponseEntity.status(200).body(ChannelListGetResponseDTO.of("채널 목록 조회 완료", channelListGetResponseDTO));
    }


}
