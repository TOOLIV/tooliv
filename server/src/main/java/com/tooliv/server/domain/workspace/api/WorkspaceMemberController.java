package com.tooliv.server.domain.workspace.api;

import com.tooliv.server.domain.workspace.application.WorkspaceMemberService;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberListGetResponseDTO;
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
@Api(value = "Workspace Members API", tags = {"Workspace Members"})
@RequiredArgsConstructor
@RequestMapping("/api/workspace/{workspaceId}/member")
public class WorkspaceMemberController {

    private final WorkspaceMemberService workspaceMemberService;

    @PostMapping
    @ApiOperation(value = "워크스페이스 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 멤버 등록 완료"),
        @ApiResponse(code = 409, message = "워크스페이스 멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerWorkspaceMember(
        @PathVariable("workspaceId") @Valid @ApiParam(value="워크스페이스 ID", required=true) String workspaceId,
        @RequestBody @ApiParam(value = "워크스페이스 멤버 등록 정보", required = true) RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO) {
        try {
            workspaceMemberService.addWorkspaceMember(workspaceId, registerWorkspaceMemberRequestDTO);
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
        @PathVariable("workspaceId") @Valid @ApiParam(value="워크스페이스 ID", required=true) String workspaceId,
        @RequestParam @ApiParam(value = "이메일", required = true) String email) {
        try {
            workspaceMemberService.deleteWorkspaceMember(workspaceId, email);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 멤버 삭제 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("워크스페이스 멤버 삭제 완료"));
    }

    @GetMapping("/list")
    @ApiOperation(value = "워크스페이스멤버 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스멤버 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 워크스페이스멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "워크스페이스멤버 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceMemberList(
        @PathVariable("workspaceId") @Valid @ApiParam(value="워크스페이스 ID", required=true) String workspaceId,
        @RequestParam @ApiParam(value="검색 단어", required = false) String keyword) {
        WorkspaceMemberListGetResponseDTO workspacememberListGetResponseDTO = null;

        try {
            workspacememberListGetResponseDTO = workspaceMemberService.getWorkspaceMemberListForRegister(workspaceId, keyword);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스멤버 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 워크스페이스멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(WorkspaceMemberListGetResponseDTO.of("워크스페이스멤버 목록 조회 완료", workspacememberListGetResponseDTO));
    }

    @GetMapping("/search")
    @ApiOperation(value = "워크스페이스멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스멤버 검색 완료"),
        @ApiResponse(code = 404, message = "검색 가능한 워크스페이스멤버 정보가 없음"),
        @ApiResponse(code = 409, message = "워크스페이스멤버 검색 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchWorkspaceMember(
        @PathVariable("workspaceId") @Valid @ApiParam(value="워크스페이스 ID", required=true) String workspaceId,
        @RequestParam @ApiParam(value="검색 단어", required = false) String keyword) {
        WorkspaceMemberListGetResponseDTO workspacememberListGetResponseDTO = null;

        try {
            workspacememberListGetResponseDTO = workspaceMemberService.searchWorkspaceMember(workspaceId, keyword);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스멤버 검색 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 워크스페이스멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(WorkspaceMemberListGetResponseDTO.of("워크스페이스멤버 검색 완료", workspacememberListGetResponseDTO));
    }
}
