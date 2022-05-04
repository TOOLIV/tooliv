package com.tooliv.server.domain.user.api;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.tooliv.server.BaseIntegrationTest;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.global.common.NotificationManager;
import com.tooliv.server.global.security.service.UserDetailsServiceImpl;
import com.tooliv.server.global.security.util.JwtAccessDeniedHandler;
import com.tooliv.server.global.security.util.JwtAuthenticationEntryPoint;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Testcontainers
public class UserControllerTest extends BaseIntegrationTest {

    private SignUpRequestDTO signUpRequestDTO;

    @MockBean
    UserService userService;

    @MockBean
    UserDetailsServiceImpl userDetailsService;

    @MockBean
    JwtAuthenticationProvider jwtAuthenticationProvider;

    @MockBean
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @MockBean
    NotificationManager notificationManager;

    @BeforeEach
    void prepareSignUp() {
        System.out.println("## BeforeEach ##");
        System.out.println();
        signUpRequestDTO = new SignUpRequestDTO("test@test.com", "test", "password");
    }

    @Test
    @DisplayName("회원가입 테스트")
    void test_signUp_returnsOk() throws Exception {
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("이메일 중복 테스트")
    void test_signUpWithDuplicatedEmail_returnsOk() throws Exception {
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("null 값을 가진 회원 정보로 회원가입")
    void test_signUpWithNullParameter_returnsConflict() throws Exception {
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(new SignUpRequestDTO("test@test.com", null, "password")))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isInternalServerError());
    }

//    @Test
//    @DisplayName("null 값을 가진 회원 정보로 회원가입2")
//    void test_signUpWithNullParameter_returnsConflict2() throws Exception {
//        mockMvc.perform(post("/api/user")
//                .content(new Gson().toJson(new SignUpRequestDTO("test@naver.com", null, null)))
//                .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isInternalServerError());
//    }


//    @Test
//    @DisplayName("로그인 테스트")
//    void test_loginWithExistingUser_returnsOk() throws Exception {
//        LogInRequestDTO logInTestDTO = new LogInRequestDTO("test@naver.com", "CKDgus12!");
//
//        mockMvc.perform(post("/apu/user/login")
//                .content(new Gson().toJson(logInTestDTO))
//                .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isOk())
//            .andExpect("$.")
//
//        given(userService.logIn(logInTestDTO)).willReturn(
//            new LogInResponseDTO("bbcc8c97-ec3a-4a7c-b59c-ab7441be9421", "test", "test@naver.com", "test", UserCode.USER, null, null));
//    }
}
