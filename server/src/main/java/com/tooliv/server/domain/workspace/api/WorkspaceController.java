package com.tooliv.server.domain.workspace.api;

import com.tooliv.server.domain.workspace.application.WorkspaceService;
import com.tooliv.server.domain.workspace.application.dto.request.ModifyWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.response.RegisterWorkspaceResponseDTO;
import com.tooliv.server.domain.workspace.application.dto.response.WorkspaceListGetResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.UserNotFoundException;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @PostMapping(consumes = {"multipart/form-data"})
    @ApiOperation(value = "워크스페이스 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "워크스페이스 등록 완료"),
        @ApiResponse(code = 409, message = "해당 유저를 찾을 수 없습니다."),
        @ApiResponse(code = 409, message = "동일한 이름의 워크스페이스가 존재합니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> registerWorkspace(
        @ApiParam(value="파일 업로드") @RequestPart(required = false) MultipartFile multipartFile,
        @ApiParam(value = "워크스페이스 등록 정보", required = true) @RequestPart RegisterWorkspaceRequestDTO registerWorkspaceRequestDTO) {
        RegisterWorkspaceResponseDTO registerWorkspaceResponseDTO = null;
        try {
            registerWorkspaceResponseDTO = workspaceService.registerWorkspace(multipartFile, registerWorkspaceRequestDTO);
            if (registerWorkspaceResponseDTO == null) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("동일한 이름의 워크스페이스가 존재합니다."));
            }
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(RegisterWorkspaceResponseDTO.of("채널 등록 완료", registerWorkspaceResponseDTO));
    }

    @PatchMapping(consumes = {"multipart/form-data"})
    @ApiOperation(value = "워크스페이스 변경 , 필수 정보 - 워크스페이스ID, 워크스페이스명")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 변경에 성공했습니다."),
        @ApiResponse(code = 404, message = "해당 워크스페이스을 찾을 수 없습니다."),
        @ApiResponse(code = 409, message = "워크스페이스 변경에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> modifyWorkspace(
        @ApiParam(value="파일 업로드") @RequestPart(required = false) MultipartFile multipartFile,
        @ApiParam(value = "수정할 워크스페이스 정보", required = true) @RequestPart ModifyWorkspaceRequestDTO modifyWorkspaceRequestDTO) {

        try {
            Integer statusCode = workspaceService.modifyWorkspace(multipartFile, modifyWorkspaceRequestDTO);

            if (statusCode == 409) {
                return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 변경에 실패했습니다."));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 워크스페이스를 찾을 수 없습니다."));
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
            Integer statusCode = workspaceService.deleteWorkspace(workspaceId);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("해당 워크스페이스를 찾을 수 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("워크스페이스 삭제에 성공했습니다."));
    }

    @GetMapping("/list")
    @ApiOperation(value = "워크스페이스 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "워크스페이스 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 워크스페이스 정보가 없음"),
        @ApiResponse(code = 409, message = "워크스페이스 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getWorkspaceList() {
        WorkspaceListGetResponseDTO workspaceListGetResponseDTO = null;

        try {
            workspaceListGetResponseDTO = workspaceService.getWorkspaceList();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("워크스페이스 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 워크스페이스 정보가 없음"));
        }

        return ResponseEntity.status(200).body(WorkspaceListGetResponseDTO.of("워크스페이스 목록 조회 완료", workspaceListGetResponseDTO));
    }
}
