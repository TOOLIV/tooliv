package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.global.exception.DuplicateEmailException;
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
@Api(value = "User API", tags = {"User"})
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping()
    @ApiOperation(value = "회원가입")
    @ApiResponses({
        @ApiResponse(code = 201, message = "회원가입 완료"),
        @ApiResponse(code = 409, message = "회원가입 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> signUp(
        @RequestBody @Valid @ApiParam(value = "회원가입 정보", required = true) SignUpRequestDTO signUpRequestDTO) {
        try {
            userService.signUp(signUpRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원가입 실패"));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("회원가입 완료"));
    }

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

    @PostMapping("/image")
    @ApiOperation(value="프로필 이미지 등록")
    @ApiResponses({
        @ApiResponse(code=201, message="프로필 이미지 등록 완료"),
        @ApiResponse(code=409, message="프로필 이미지 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> uploadProfileImage(
        @ApiParam(value="이미지", required=true) @RequestPart MultipartFile multipartFile) {
        try {
            userService.uploadProfileImage(multipartFile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("프로필 이미지 등록 실패"));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("프로필 이미지 등록 성공"));
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
            userService.checkEmail(email);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("이메일 사용 불가"));
        }

        return ResponseEntity.status(200).body(BaseResponseDTO.of("이메일 사용 가능"));
    }

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
            userListResponseDTO = userService.getUserList(keyword);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원 정보 목록 조회 실패"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(BaseResponseDTO.of("조회 가능한 회원 정보가 없음"));
        }

        return ResponseEntity.status(200).body(UserListResponseDTO.of("회원 정보 목록 조회 완료", userListResponseDTO));
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

}
