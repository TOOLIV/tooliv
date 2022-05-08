package com.tooliv.server.domain.user.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.tooliv.server.BaseIntegrationTest;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.io.FileInputStream;
import java.util.Optional;
import org.apache.http.HttpHeaders;
import org.json.JSONObject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest extends BaseIntegrationTest {

    @Autowired
    ApplicationContext resourceLoader;

    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    private static String token;

    @Order(1)
    @Test
    @DisplayName("SignUp Test - Normal")
    void shouldAbleToSignUp() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test@test.com", "test", "password");
        SignUpRequestDTO signUpRequestDTO2 = new SignUpRequestDTO("test2@test.com", "test2", "password2");

        // When
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO2))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated());

        Optional<User> user = userRepository.findByEmailAndDeletedAt("test@test.com", null);
        Optional<User> user2 = userRepository.findByEmailAndDeletedAt("test2@test.com", null);

        // Then
        assertTrue(user.isPresent());
        assertTrue(user2.isPresent());
        assertEquals(user.get().getName(), "test");
        assertEquals(user2.get().getName(), "test2");

    }

    @Order(2)
    @Test
    @DisplayName("SignUp Test - Wrong Email Type")
    void shouldNotAbleToSignUpWithWrongEmailType() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test", "test", "password");

        // When
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest());

        // Then
        assertFalse(userRepository.findByEmailAndDeletedAt(signUpRequestDTO.getEmail(), null).isPresent());

    }

    @Order(3)
    @Test
    @DisplayName("SignUp Test - Duplicated Email")
    void shouldNotAbleToSignUpWithDuplicatedEmail() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO("test@test.com", "test3", "password2");

        // When
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isConflict());

        // Then
        assertTrue(userRepository.findByEmailAndDeletedAt(signUpRequestDTO.getEmail(), null).isPresent());
        assertTrue(userRepository.findByNickname("test").isPresent());
        assertFalse(userRepository.findByNickname(signUpRequestDTO.getName()).isPresent());

    }

    @Order(4)
    @Test
    @DisplayName("SignUp Test - RequestDTO including null")
    void shouldNotAbleToSignUpWithNullParameters() throws Exception {

        // Given
        SignUpRequestDTO signUpRequestDTO1 = new SignUpRequestDTO(null, "null-test1", "null-password1");
        SignUpRequestDTO signUpRequestDTO2 = new SignUpRequestDTO("null-test2@test.com", null, "null-password2");
        SignUpRequestDTO signUpRequestDTO3 = new SignUpRequestDTO("null-test3@test.com", "null-test3", null);

        // When
        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO1))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest());

        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO2))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest());

        mockMvc.perform(post("/api/user")
                .content(new Gson().toJson(signUpRequestDTO3))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest());

        // Then
        assertNull(userRepository.findByEmailAndDeletedAt(signUpRequestDTO1.getEmail(), null).orElse(null));
        assertNull(userRepository.findByEmailAndDeletedAt(signUpRequestDTO2.getEmail(), null).orElse(null));
        assertNull(userRepository.findByEmailAndDeletedAt(signUpRequestDTO3.getEmail(), null).orElse(null));

    }

    @Order(5)
    @Test
    @DisplayName("LogIn Test - Existing User Case")
    void shouldAbleToLogIn() throws Exception {

        // Given
        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("test@test.com", "password");

        assertNotNull(userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null).orElse(null));

        // When
        MvcResult result = mockMvc.perform(post("/api/user/login")
                .content(new Gson().toJson(logInRequestDTO))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated())
            .andReturn();

        // Then
        assertNotNull(result.getResponse());

        String jsonString = result.getResponse().getContentAsString();
        JSONObject jsonObject = new JSONObject(jsonString);
        token = jsonObject.getString("accessToken");

    }

    @Order(6)
    @Test
    @DisplayName("LogIn Test - Not Existing User Case")
    void shouldNotAbleToLogIn() throws Exception {

        // Given
        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("test3@test.com", "password3");
        assertNull(userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null).orElse(null));

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user/login")
            .content(new Gson().toJson(logInRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isInternalServerError());

    }

    @Order(7)
    @Test
    @DisplayName("LogIn Test - Existing User But Password Wrong")
    void shouldNotAbleToLogInWithWrongPassword() throws Exception {

        // Given
        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("test@test.com", "wrong-password");
        assertTrue(userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null).isPresent());

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/user/login")
            .content(new Gson().toJson(logInRequestDTO))
            .contentType(MediaType.APPLICATION_JSON));

        // Then
        resultActions.andExpect(status().isConflict());

    }

    @Order(8)
    @Test
    @DisplayName("Image Upload Test - Uploading Image File")
    void shouldAbleToUploadProfileImage() throws Exception {

        // Given
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "test@test.com");

        Resource resource = resourceLoader.getResource("classpath:tooliv_img.jpeg");
        MockMultipartFile mockMultipartFile = new MockMultipartFile("multipartFile", "tooliv_img.jpeg", "image/jpeg",
            new FileInputStream(resource.getFile()));

        // When
        ResultActions resultActions = mockMvc.perform(multipart("/api/user/image")
            .file(mockMultipartFile)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        resultActions.andExpect(status().isCreated());

    }

    @Order(9)
    @Test
    @DisplayName("Image Upload Test - Uploading Non-Image File")
    void shouldAbleToUploadProfileImageWithNonImageFile() throws Exception {

        // Given
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "test@test.com");
        String profileImage = userRepository.findByEmailAndDeletedAt("test@test.com", null).get().getProfileImage();

        Resource resource = resourceLoader.getResource("classpath:tooliv_txt.txt");
        MockMultipartFile mockMultipartFile = new MockMultipartFile("multipartFile", "tooliv_txt.txt", "text/*",
            new FileInputStream(resource.getFile()));

        // When
        ResultActions resultActions = mockMvc.perform(multipart("/api/user/image")
            .file(mockMultipartFile)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        resultActions.andExpect(status().isConflict());

    }

    @Order(10)
    @Test
    @DisplayName("Get User Profile Info Test - Existing User")
    void shouldReturnUserInfo() throws Exception {

        // Given
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "test@test.com");
        assertTrue(userRepository.findByEmailAndDeletedAt("test2@test.com", null).isPresent());

        // When
        MvcResult result = mockMvc.perform(get("/api/user/info/test2@test.com")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
            .andExpect(status().isOk())
            .andReturn();

        // Then
        String jsonString = result.getResponse().getContentAsString();
        JSONObject jsonObject = new JSONObject(jsonString);

        assertEquals(jsonObject.getString("nickname"), "test2");

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
