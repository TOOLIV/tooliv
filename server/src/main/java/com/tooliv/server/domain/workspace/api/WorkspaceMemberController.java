package com.tooliv.server.domain.workspace.api;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.DeleteChannelMemberRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.RegisterChannelMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.WorkspaceMemberService;
import com.tooliv.server.domain.workspace.application.WorkspaceService;
import com.tooliv.server.domain.workspace.application.dto.request.DeleteWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Workspace Members API", tags = {"Workspace Members"})
@RequiredArgsConstructor
@RequestMapping("/api/workspace-member")
public class WorkspaceMemberController {

    private final WorkspaceMemberService workspaceMemberService;

    @PostMapping
    @ApiOperation(value = "워크스페이스 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 멤버 등록 완료"),
        @ApiResponse(code = 409, message = "워크스페이스 멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerWorkspaceMember(
        @RequestBody @ApiParam(value = "워크스페이스 멤버 등록 정보", required = true) RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO) {
        try {
            workspaceMemberService.addWorkspaceMember(registerWorkspaceMemberRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 멤버 등록 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("워크스페이스 멤버 등록 완료"));
    }

    @DeleteMapping
    @ApiOperation(value = "워크스페이스 멤버 삭제")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 멤버 삭제 완료"),
        @ApiResponse(code = 409, message = "워크스페이스 멤버 삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteWorkspaceMember(
        @RequestBody @ApiParam(value = "워크스페이스 멤버 등록 삭제", required = true) DeleteWorkspaceMemberRequestDTO deleteWorkspaceMemberRequestDTO) {
        try {
            workspaceMemberService.deleteWorkspaceMember(deleteWorkspaceMemberRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 멤버 삭제 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("워크스페이스 멤버 삭제 완료"));
    }

}
