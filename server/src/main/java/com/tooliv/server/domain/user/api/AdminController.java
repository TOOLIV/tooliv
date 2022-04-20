package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.application.service.AdminService;
import com.tooliv.server.domain.user.exception.NotUniqueEmailException;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Admin API", tags = {"Admin"})
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/user")
    @ApiOperation(value = "회원가입")
    @ApiResponses({
        @ApiResponse(code = 201, message = "회원가입 완료"),
        @ApiResponse(code = 409, message = "회원가입 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> signUp(
        @RequestBody @Valid @ApiParam(value = "회원가입 정보", required = true) SignUpRequestDTO signUpRequestDTO) {
        try {
            adminService.signUp(signUpRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원가입 실패"));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("회원가입 완료"));
    }

    @GetMapping("/check/{email}")
    @ApiOperation(value = "이메일 중복 체크")
    @ApiResponses({
        @ApiResponse(code = 200, message = "이메일 사용 가능"),
        @ApiResponse(code = 409, message = "이메일 사용 불가"),
    })
    public ResponseEntity<? extends BaseResponseDTO> checkEmail(
        @PathVariable("email") @ApiParam(value = "이메일", required = true) String email) {
        try {
            adminService.checkEmail(email);
        } catch (NotUniqueEmailException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("이메일 사용 불가"));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("이메일 사용 가능"));
    }

    @GetMapping("/list/user")
    @ApiOperation(value = "회원 정보 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원 정보 목록 조회 완료"),
        @ApiResponse(code = 404, message = "조회 가능한 회원 정보가 없음"),
        @ApiResponse(code = 409, message = "회원 정보 목록 조회 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getUserList() {
        UserListResponseDTO userListResponseDTO = null;

        try {
            userListResponseDTO = adminService.getUserList();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원 정보 목록 조회 실패"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 회원 정보가 없음"));
        }

        return ResponseEntity.status(200).body(UserListResponseDTO.of("회원 정보 목록 조회 완료", userListResponseDTO));
    }

}
