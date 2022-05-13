package com.tooliv.server.domain.workspace.api;

import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.workspace.application.WorkspaceMemberService;
import com.tooliv.server.domain.workspace.application.WorkspaceService;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.RegisterWorkspaceResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceListGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberCodeGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceMemberListGetResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceNameGetResponseDTO;
import com.tooliv.server.domain.workspace.exception.DuplicateWorkspaceException;
import com.tooliv.server.domain.workspace.exception.WorkspaceMemberNotFoundException;
import com.tooliv.server.domain.workspace.exception.WorkspaceNotFoundException;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.UserNotFoundException;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@Api(value = "Workspace API", tags = {"Workspace"})
@RequiredArgsConstructor
@RequestMapping("/api/workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    private final WorkspaceMemberService workspaceMemberService;

    @PostMapping(consumes = {"multipart/form-data"})
    @ApiOperation(value = "워크스페이스 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 등록 완료"),
        @ApiResponse(code = 404, message = "해당 유저를 찾을 수 없습니다."),
        @ApiResponse(code = 409, message = "동일한 이름의 워크스페이스가 존재합니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerWorkspace(
        @ApiParam(value = "파일 업로드") @RequestPart(required = false) MultipartFile multipartFile,
        @ApiParam(value = "워크스페이스 등록 정보", required = true) @RequestPart RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO) {
        RegisterWorkspaceResponseDTO registerWorkspaceResponseDTO = null;
        try {
            registerWorkspaceResponseDTO = workspaceService.registerWorkspace(multipartFile, registerWorkspaceRequestDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        } catch (DuplicateWorkspaceException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(RegisterWorkspaceResponseDTO.of("워크스페이스 등록 완료", registerWorkspaceResponseDTO));
    }

    @PatchMapping(consumes = {"multipart/form-data"})
    @ApiOperation(value = "워크스페이스 변경 , 필수 정보 - 워크스페이스ID, 워크스페이스명")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 변경에 성공했습니다."),
        @ApiResponse(code = 404, message = "해당 워크스페이스을 찾을 수 없습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> modifyWorkspace(
        @ApiParam(value = "파일 업로드") @RequestPart(required = false) MultipartFile multipartFile,
        @ApiParam(value = "수정할 워크스페이스 정보", required = true) @RequestPart ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO) {
        try {
            workspaceService.modifyWorkspace(multipartFile, modifyWorkspaceRequestDTO);
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("워크스페이스 변경에 성공했습니다."));
    }


    @DeleteMapping("/{workspaceId}")
    @ApiOperation(value = "워크스페이스 삭제")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 삭제에 성공했습니다."),
        @ApiResponse(code = 404, message = "해당 워크스페이스를 찾을 수 없습니다.")
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteWorkspace(
        @PathVariable("workspaceId") @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId) {
        try {
            workspaceService.deleteWorkspace(workspaceId);
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("워크스페이스 삭제에 성공했습니다."));
    }

    @GetMapping("/list")
    @ApiOperation(value = "워크스페이스 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 목록 조회 완료"),
        @ApiResponse(code = 404, message = "워크스페이스 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceList() {
        WorkspaceListGetResponseDTO workspaceListGetResponseDTO = null;
        try {
            workspaceListGetResponseDTO = workspaceService.getWorkspaceList();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(WorkspaceListGetResponseDTO.of(e.getMessage(), new WorkspaceListGetResponseDTO()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(WorkspaceListGetResponseDTO.of(e.getMessage(), new WorkspaceListGetResponseDTO()));
        }
        return ResponseEntity.status(200).body(WorkspaceListGetResponseDTO.of("워크스페이스 목록 조회 완료", workspaceListGetResponseDTO));
    }

    @GetMapping("/info")
    @ApiOperation(value = "워크스페이스명 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스명 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 워크스페이스 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceInfo(
        @RequestParam @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId) {
        WorkspaceNameGetResponseDTO workspaceNameGetResponseDTO = null;
        try {
            workspaceNameGetResponseDTO = workspaceService.getWorkspaceName(workspaceId);
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(WorkspaceListGetResponseDTO.of(e.getMessage(), new WorkspaceListGetResponseDTO()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(WorkspaceListGetResponseDTO.of(e.getMessage(), new WorkspaceListGetResponseDTO()));
        }
        return ResponseEntity.status(200).body(WorkspaceNameGetResponseDTO.of("워크스페이스명 조회 완료", workspaceNameGetResponseDTO));
    }

    @PostMapping("/{workspaceId}/member")
    @ApiOperation(value = "워크스페이스 멤버 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 멤버 등록 완료"),
        @ApiResponse(code = 404, message = "워크스페이스 멤버 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerWorkspaceMember(
        @PathVariable("workspaceId") @Valid @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId,
        @RequestBody @ApiParam(value = "워크스페이스 멤버 등록 정보", required = true) RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO) {
        try {
            workspaceMemberService.addWorkspaceMember(workspaceId, registerWorkspaceMemberRequestDTO);
        } catch (ChannelNotFoundException | WorkspaceNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(BaseResponseDTO.of("워크스페이스 멤버 등록 완료"));
    }

    @DeleteMapping("/{workspaceId}/member")
    @ApiOperation(value = "워크스페이스 멤버 삭제")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 멤버 삭제 완료"),
        @ApiResponse(code = 404, message = "워크스페이스 멤버 삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteWorkspaceMember(
        @PathVariable("workspaceId") @Valid @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId,
        @RequestParam @ApiParam(value = "이메일", required = true) String email) {
        try {
            workspaceMemberService.deleteWorkspaceMember(workspaceId, email);
        } catch (UserNotFoundException | WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("워크스페이스 멤버 삭제 완료"));
    }

    @GetMapping("/{workspaceId}/member/list")
    @ApiOperation(value = "워크스페이스멤버 등록을 위한 회원목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스멤버 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 워크스페이스멤버 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceMemberList(
        @PathVariable("workspaceId") @Valid @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        WorkspaceMemberListGetResponseDTO workspacememberListGetResponseDTO = null;

        try {
            workspacememberListGetResponseDTO = workspaceMemberService.getWorkspaceMemberListForRegister(workspaceId, keyword, seq);
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200).body(WorkspaceMemberListGetResponseDTO.of("워크스페이스멤버 목록 조회 완료", workspacememberListGetResponseDTO));
    }

    @GetMapping("/{workspaceId}/member/search")
    @ApiOperation(value = "워크스페이스멤버 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스멤버 검색 완료"),
        @ApiResponse(code = 404, message = "검색 가능한 워크스페이스멤버 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> searchWorkspaceMember(
        @PathVariable("workspaceId") @Valid @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId,
        @RequestParam @ApiParam(value = "검색 단어", required = false) String keyword,
        @RequestParam @ApiParam(value = "검색결과 시퀀스", required = true) int seq) {
        WorkspaceMemberListGetResponseDTO workspacememberListGetResponseDTO = null;

        try {
            workspacememberListGetResponseDTO = workspaceMemberService.searchWorkspaceMember(workspaceId, keyword, seq);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("검색 가능한 워크스페이스멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(WorkspaceMemberListGetResponseDTO.of("워크스페이스멤버 검색 완료", workspacememberListGetResponseDTO));
    }

    @GetMapping("/{workspaceId}/member/code")
    @ApiOperation(value = "워크스페이스 멤버 코드 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 멤버 코드 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 워크스페이스 멤버 정보가 없음"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceMemberCode(
        @PathVariable("workspaceId") @Valid @ApiParam(value = "워크스페이스 ID", required = true) String workspaceId) {
        WorkspaceMemberCodeGetResponseDTO workspaceMemberCodeGetResponseDTO = null;
        try {
            workspaceMemberCodeGetResponseDTO = workspaceMemberService.getWorkspaceMemberCode(workspaceId);
        } catch (UserNotFoundException | WorkspaceNotFoundException | WorkspaceMemberNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회된 워크스페이스 멤버 정보가 없음"));
        }
        return ResponseEntity.status(200).body(WorkspaceMemberCodeGetResponseDTO.of("워크스페이스 멤버 코드 조회 완료", workspaceMemberCodeGetResponseDTO));
    }
}
