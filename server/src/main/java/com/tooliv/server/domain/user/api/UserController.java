package com.tooliv.server.domain.user.api;

import com.tooliv.server.domain.user.application.UserService;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
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
        @ApiResponse(code = 201, message = "회원가입에 성공했습니다."),
        @ApiResponse(code = 409, message = "회원가입에 실패했습니다."),
    })
    public ResponseEntity<? extends BaseResponseDTO> signUp(
        @RequestBody @Valid @ApiParam(value = "유저 정보", required = true) SignUpRequestDTO signUpRequestDTO) {
        try {
            userService.signUp(signUpRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("회원가입에 실패했습니다."));
        }

        return ResponseEntity.status(201).body(BaseResponseDTO.of("회원가입에 성공했습니다."));
    }


}
