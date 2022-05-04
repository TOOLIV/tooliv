package com.tooliv.server.domain.user.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.tooliv.server.BaseIntegrationTest;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest extends BaseIntegrationTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Order(1)
    @Test
    @DisplayName("SignUp Test - Perfect Case")
    void shouldSaveNewUser() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test@test.com", "test", "password");

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user")
            .content(new Gson().toJson(signUpRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isCreated());

        Optional<User> user = userRepository.findByEmailAndDeletedAt("test@test.com", null);

        // Then
        assertTrue(user.isPresent());
        assertEquals(user.get().getEmail(), "test@test.com");

    }

    @Order(2)
    @Test
    @DisplayName("SignUp Test - Wrong Email Type Case")
    void shouldNotSaveUserWithWrongEmailType() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test", "test", "password");

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user")
            .content(new Gson().toJson(signUpRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isInternalServerError());

    }

    @Order(3)
    @Test
    @DisplayName("SignUp Test - Duplicated Email Case")
    void shouldNotSaveUserWithDuplicatedEmail() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test@test.com", "test2", "password2");

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user")
            .content(new Gson().toJson(signUpRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isConflict());

    }

    @Order(4)
    @Test
    @DisplayName("LogIn Test - Existing User Case")
    void shouldAbleToLogIn() throws Exception {

        // Given
        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("test@test.com", "password");

        assertNotNull(userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null).orElse(null));

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user/login")
            .content(new Gson().toJson(logInRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isCreated());

    }

    @Order(5)
    @Test
    @DisplayName("LogIn Test - Not Existing User Case")
    void shouldNotAbleToLogIn() throws Exception {

        // Given
        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("test2@test.com", "password2");
        assertNull(userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null).orElse(null));

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user/login")
            .content(new Gson().toJson(logInRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isInternalServerError());

    }

//    @Test
//    @DisplayName("이메일 중복 테스트")
//    void test_signUpWithDuplicatedEmail_returnsOk() throws Exception {
//        mockMvc.perform(post("/api/user")
//                .content(new Gson().toJson(signUpRequestDTO))
//                .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isCreated());
//    }
//
//    @Test
//    @DisplayName("null 값을 가진 회원 정보로 회원가입")
//    void test_signUpWithNullParameter_returnsConflict() throws Exception {
//        mockMvc.perform(post("/api/user")
//                .content(new Gson().toJson(new SignUpRequestDTO("test@test.com", null, "password")))
//                .contentType(MediaType.APPLICATION_JSON))
//            .andExpect(status().isInternalServerError());
//    }

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
