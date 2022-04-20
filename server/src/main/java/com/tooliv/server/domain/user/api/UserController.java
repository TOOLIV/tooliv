package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "User API", tags = {"User"})
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    @ApiResponses({
        @ApiResponse(code = 201, message = "로그인 성공"),
        @ApiResponse(code = 409, message = "로그인 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> logIn(
        @RequestBody @Valid @ApiParam(value = "로그인 정보", required = true) LogInRequestDTO logInRequestDTO) {
        LogInResponseDTO logInResponseDTO = null;

        try {
            logInResponseDTO = userService.logIn(logInRequestDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("로그인 실패"));
        }
        return ResponseEntity.status(201).body(LogInResponseDTO.of("로그인 성공", logInResponseDTO));
    }

    @PatchMapping()
    @ApiOperation(value = "닉네임 수정")
    @ApiResponses({
        @ApiResponse(code = 200, message = "닉네임 변경 완료"),
        @ApiResponse(code = 409, message = "닉네임 변경 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> updateNickname(
        @RequestBody @ApiParam(value = "수정할 닉네임", required = true) NicknameUpdateRequestDTO nicknameUpdateRequestDTO) {
        NicknameResponseDTO nicknameResponseDTO = null;

        try {
            nicknameResponseDTO = userService.updateNickname(nicknameUpdateRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("닉네임 변경 실패"));
        }
        return ResponseEntity.status(200)
            .body(NicknameResponseDTO.of("닉네임 변경 완료", nicknameResponseDTO));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴")
    @ApiResponses({
        @ApiResponse(code = 204, message = "회원 탈퇴 완료"),
        @ApiResponse(code = 409, message = "회원 탈퇴 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> deleteUser() {
        try {
            userService.deleteUser();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원 탈퇴 실패"));
        }

        return ResponseEntity.status(204).body(BaseResponseDTO.of("회원 탈퇴 완료"));
    }

}
