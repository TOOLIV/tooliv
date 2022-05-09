package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.StatusUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.ProfileInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.global.exception.DuplicateEmailException;
import com.tooliv.server.global.common.BaseResponseDTO;
import com.tooliv.server.global.exception.NotImageFileException;
import com.tooliv.server.global.exception.UserNotFoundException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.InputStream;
import java.util.Arrays;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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

    private final String[] MIME_TYPE = {"image/gif", "image/jpeg", "image/jpg", "image/png", "image/bmp"};

    @PostMapping()
    @ApiOperation(value = "회원가입")
    public ResponseEntity<? extends BaseResponseDTO> signUp(
        @RequestBody @Valid @ApiParam(value = "회원가입 정보", required = true) SignUpRequestDTO signUpRequestDTO) {
        try {
            userService.signUp(signUpRequestDTO);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("회원가입 완료"));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<? extends BaseResponseDTO> logIn(
        @RequestBody @Valid @ApiParam(value = "로그인 정보", required = true) LogInRequestDTO logInRequestDTO) {
        LogInResponseDTO logInResponseDTO = null;

        try {
            logInResponseDTO = userService.logIn(logInRequestDTO);
        } catch (UserNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(201).body(LogInResponseDTO.of("로그인 성공", logInResponseDTO));
    }

    @PostMapping("/image")
    @ApiOperation(value = "프로필 이미지 등록")
    public ResponseEntity<? extends BaseResponseDTO> uploadProfileImage(
        @ApiParam(value = "이미지", required = true) @RequestPart MultipartFile multipartFile) {

        try {
            InputStream is = multipartFile.getInputStream();
            String mimeType = new Tika().detect(is);

            if(!Arrays.asList(MIME_TYPE).contains(mimeType)) {
                throw new NotImageFileException("사진 파일이 아님");
            }

            userService.uploadProfileImage(multipartFile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("프로필 이미지 등록 실패"));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("프로필 이미지 등록 성공"));
    }

    @GetMapping("/info/{email}")
    @ApiOperation(value = "회원 프로필 정보 조회 - 프로필 사진, 닉네임")
    public ResponseEntity<? extends BaseResponseDTO> getProfileInfo(
        @PathVariable("email") @ApiParam(value = "이메일", required = true) String email) {
        ProfileInfoResponseDTO profileInfoResponseDTO = null;
        try {
            profileInfoResponseDTO = userService.getProfileInfo(email);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(ProfileInfoResponseDTO.of("프로필 정보 조회 완료", profileInfoResponseDTO));
    }


    @GetMapping("/check/{email}")
    @ApiOperation(value = "이메일 중복 체크")
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
    public ResponseEntity<? extends BaseResponseDTO> getUserList(
        @ApiParam(value = "검색 단어", required = true) @RequestParam String keyword,
        @ApiParam(value = "sequence", required = true) @RequestParam int sequence) {
        UserListResponseDTO userListResponseDTO = null;

        try {
            userListResponseDTO = userService.getUserList(keyword, sequence);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseDTO.of(e.getMessage()));
        }

        return ResponseEntity.status(200).body(UserListResponseDTO.of("회원 정보 목록 조회 완료", userListResponseDTO));
    }

    @PatchMapping()
    @ApiOperation(value = "닉네임 수정")
    public ResponseEntity<? extends BaseResponseDTO> updateNickname(
        @RequestBody @ApiParam(value = "수정할 닉네임", required = true) NicknameUpdateRequestDTO nicknameUpdateRequestDTO) {
        NicknameResponseDTO nicknameResponseDTO = null;

        try {
            nicknameResponseDTO = userService.updateNickname(nicknameUpdateRequestDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of(e.getMessage()));
        }
        return ResponseEntity.status(200)
            .body(NicknameResponseDTO.of("닉네임 변경 완료", nicknameResponseDTO));
    }

    @PatchMapping()
    @ApiOperation(value = "상태 수정")
    public ResponseEntity<? extends BaseResponseDTO> updateStatus(
        @RequestBody @ApiParam(value = "수정할 상태", required = true) StatusUpdateRequestDTO statusUpdateRequestDTO) {

    }

}
