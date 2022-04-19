package com.tooliv.server.domain.workspace.api;

import com.tooliv.server.domain.channel.application.ChannelService;
import com.tooliv.server.domain.channel.application.dto.request.ModifyChannelRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelRequestDTO;
import com.tooliv.server.domain.workspace.application.WorkspaceService;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin("*")
@Api(value = "Workspace API", tags = {"Workspace"})
@RequiredArgsConstructor
@RequestMapping("/api/workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @PostMapping
    @ApiOperation(value = "워크스페이스 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "워크스페이스 등록 완료"),
            @ApiResponse(code = 409, message = "해당 유저를 찾을 수 없습니다."),
            @ApiResponse(code = 409, message = "동일한 이름의 워크스페이스가 존재합니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerworkspace(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @ApiParam(value = "워크스페이스 등록 정보", required = true) RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO) {
        try {
            Integer statusCode = workspaceService.registerWorkspace(accessToken, registerWorkspaceRequestDTO);
            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("동일한 이름의 워크스페이스가 존재합니다."));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 유저를 찾을 수 없습니다."));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널 등록 완료"));
    }

    @PatchMapping
    @ApiOperation(value="워크스페이스 변경 , 필수 정보 - 워크스페이스ID, 워크스페이스명")
    @ApiResponses({
            @ApiResponse(code=200, message="워크스페이스 변경에 성공했습니다."),
            @ApiResponse(code=404, message="해당 워크스페이스을 찾을 수 없습니다."),
            @ApiResponse(code=409, message="워크스페이스 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> modifyWorkspace(
            @ApiIgnore @RequestHeader("Authorization") String accessToken,
            @RequestBody @ApiParam(value="수정할 워크스페이스 정보", required=true) ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO) {

        try {
            Integer statusCode = workspaceService.modifyWorkspace(accessToken, modifyWorkspaceRequestDTO);

            if(statusCode == 409)
                return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 변경에 실패했습니다."));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 워크스페이스를 찾을 수 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("워크스페이스 변경에 성공했습니다."));
    }
}
