package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.UserCodeUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.TotalUsersResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.application.service.AdminService;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.DuplicateEmailException;
import com.tooliv.server.global.exception.UserNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Admin API", tags = {"Admin"})
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping()
    @ApiOperation(value = "회원가입")
    public ResponseEntity<? extends BaseResponseDTO> signUp(
        @RequestBody @Valid @ApiParam(value = "회원가입 정보", required = true) SignUpRequestDTO signUpRequestDTO) {
        try {
            adminService.signUp(signUpRequestDTO);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("회원가입 완료"));
    }

    @GetMapping("/search")
    @ApiOperation(value = "회원 정보 목록 조회")
    public ResponseEntity<? extends BaseResponseDTO> getUserList(
        @ApiParam(value = "검색 단어", required = true) @RequestParam String keyword,
        @ApiParam(value = "sequence", required = true) @RequestParam int sequence) {
        UserListResponseDTO userListResponseDTO = null;

        try {
            userListResponseDTO = adminService.getUserList(keyword, sequence);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(UserListResponseDTO.of("회원 정보 목록 조회 완료", userListResponseDTO));
    }

    @GetMapping("/check/{email}")
    @ApiOperation(value = "이메일 중복 체크")
    public ResponseEntity<? extends BaseResponseDTO> checkEmail(
        @PathVariable("email") @ApiParam(value = "이메일", required = true) String email) {
        try {
            adminService.checkEmail(email);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("이메일 사용 불가"));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("이메일 사용 가능"));
    }

    @GetMapping("/total")
    @ApiOperation(value = "전체 회원 수 조회")
    public ResponseEntity<? extends BaseResponseDTO> getTotalUsers() {
        TotalUsersResponseDTO totalUserResponseDTO = null;

        try {
            totalUserResponseDTO = adminService.getTotalUsers();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(TotalUsersResponseDTO.of("전체 회원 수 조회 완료", totalUserResponseDTO));
    }


    @PatchMapping("/code")
    @ApiOperation(value = "유저 권한 변경")
    public ResponseEntity<? extends BaseResponseDTO> updateUserCode(
        @RequestBody @ApiParam(value = "유저 권한 변경 정보", required = true) UserCodeUpdateRequestDTO userCodeUpdateRequestDTO) {
        try {
            adminService.updateUserCode(userCodeUpdateRequestDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("권한 변경 완료"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 삭제")
    public ResponseEntity<? extends BaseResponseDTO> deleteUser(
        @ApiParam(value = "삭제할 회원 이메일", required = true) @RequestParam String email) {
        try {
            adminService.deleteUser(email);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(204).body(BaseResponseDTO.of("회원 삭제 완료"));
    }

}
