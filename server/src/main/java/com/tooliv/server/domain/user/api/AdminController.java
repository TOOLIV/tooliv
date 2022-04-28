package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.dto.request.UserCodeUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.application.service.AdminService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Admin API", tags = {"Admin"})
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/search")
    @ApiOperation(value = "회원 정보 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원 정보 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 회원 정보가 없음"),
        @ApiResponse(code = 409, message = "회원 정보 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getUserList(
        @ApiParam(value="검색 단어", required = true) @RequestParam String keyword) {
        UserListResponseDTO userListResponseDTO = null;

        try {
            userListResponseDTO = adminService.getUserList(keyword);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 회원 정보가 없음"));
        }

        return ResponseEntity.status(200).body(UserListResponseDTO.of("회원 정보 목록 조회 완료", userListResponseDTO));
    }

    @PatchMapping("/code")
    @ApiOperation(value = "유저 권한 변경")
    @ApiResponses({
        @ApiResponse(code = 200, message = "권한 변경 완료"),
        @ApiResponse(code = 409, message = "권한 변경 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> updateUserCode(
        @RequestBody @ApiParam(value = "유저 권한 변경 정보", required = true) UserCodeUpdateRequestDTO userCodeUpdateRequestDTO) {
        try {
            adminService.updateUserCode(userCodeUpdateRequestDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("권한 변경 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseDTO.of("권한 변경 완료"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 삭제")
    @ApiResponses({
        @ApiResponse(code = 204, message = "회원 삭제 완료"),
        @ApiResponse(code = 409, message = "회원 삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteUser(
        @ApiParam(value="삭제할 회원 이메일", required = true) @RequestParam String email) {
        try {
            adminService.deleteUser(email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원 삭제 실패"));
        }

        return ResponseEntity.status(204).body(BaseResponseDTO.of("회원 삭제 완료"));
    }

}
