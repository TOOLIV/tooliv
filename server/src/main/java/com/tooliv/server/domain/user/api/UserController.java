package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.UserService;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
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

    @PostMapping
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


}
