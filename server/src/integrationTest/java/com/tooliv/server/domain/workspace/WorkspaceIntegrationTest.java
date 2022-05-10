package com.tooliv.server.domain.workspace;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tooliv.server.BaseIntegrationTest;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Objects;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.ResultActions;

@TestInstance(Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@AutoConfigureMockMvc
public class WorkspaceIntegrationTest extends BaseIntegrationTest {

    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WorkspaceRepository workspaceRepository;

    private static String token;

    @BeforeAll
    void setUp() {
        String[] nameList = {"kimssafy", "parkssafy", "sonssafy", "songssafy", "leessafy", "inssafy", "jangssafy", "jeongssafy", "jessafy"};
        String[] emailList = {"kimssafy@test.com", "parkssafy@test.com", "sonssafy@test.com", "songssafy@test.com", "leessafy@test.com", "inssafy@test.com", "jangssafy@test.com",
            "jeongssafy@test.com", "jessafy@test.com"};

        for (int i = 0; i < nameList.length; i++) {
            User user = User.builder()
                .name(nameList[i])
                .nickname(nameList[i])
                .email(emailList[i])
                .password(passwordEncoder.encode("1234"))
                .createdAt(LocalDateTime.now())
                .userCode(UserCode.USER)
                .build();

            userRepository.save(user);
        }

        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("kimssafy@test.com", "1234");

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(logInRequestDTO.getEmail(),
                logInRequestDTO.getPassword()));

        token = jwtAuthenticationProvider.createToken(authentication);
    }

    @Order(1)
    @Test
    void itShouldCreateWorkspaceSuccessfully() throws Exception {
        // Give
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String workspaceName = "seoul";
        RegisterWorkspaceRequestDTO workspaceDTO = new RegisterWorkspaceRequestDTO(workspaceName);

        String registerWorkspaceRequestDTOJson = Objects.requireNonNull(objectToJson((workspaceDTO)));
        MockMultipartFile registerWorkspaceRequestDTO = new MockMultipartFile("registerWorkspaceRequestDTO", "registerWorkspaceRequestDTO", "application/json",
            registerWorkspaceRequestDTOJson.getBytes());

        // When
        ResultActions workspaceRegResultActions = mockMvc.perform(multipart("/api/workspace")
            .file(registerWorkspaceRequestDTO)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceRegResultActions.andExpect(status().isCreated());
        assertThat(workspaceRepository.findByNameAndDeletedAt(workspaceName, null)
            .isPresent());

    }

    @Order(2)
    @Test
    void itShouldCreateWorkspaceWithThumbnailSuccessfully() throws Exception {
        // Given
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String workspaceName = "daejeon";
        RegisterWorkspaceRequestDTO workspaceDTO = new RegisterWorkspaceRequestDTO(workspaceName);

        String registerWorkspaceRequestDTOJson = Objects.requireNonNull(objectToJson((workspaceDTO)));
        MockMultipartFile registerWorkspaceRequestDTO = new MockMultipartFile("registerWorkspaceRequestDTO", "registerWorkspaceRequestDTO", "application/json",
            registerWorkspaceRequestDTOJson.getBytes());

        MockMultipartFile multipartFile = new MockMultipartFile("multipartFile", "thumbnail_test.txt", "text/plain", "test file".getBytes(StandardCharsets.UTF_8));

        // When
        ResultActions workspaceRegResultActions = mockMvc.perform(multipart("/api/workspace")
            .file(multipartFile)
            .file(registerWorkspaceRequestDTO)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceRegResultActions.andExpect(status().isCreated());
        assertThat(workspaceRepository.findByNameAndDeletedAt(workspaceName, null)
            .isPresent());

    }

    @Order(3)
    @Test
    void itShouldNotCreateWorkspaceWhenNameIsDuplicated() throws Exception {
        // Given
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String workspaceName = "seoul";
        RegisterWorkspaceRequestDTO workspaceDTO = new RegisterWorkspaceRequestDTO(workspaceName);

        String registerWorkspaceRequestDTOJson = Objects.requireNonNull(objectToJson((workspaceDTO)));
        MockMultipartFile registerWorkspaceRequestDTO = new MockMultipartFile("registerWorkspaceRequestDTO", "registerWorkspaceRequestDTO", "application/json",
            registerWorkspaceRequestDTOJson.getBytes());

        // When
        ResultActions workspaceRegResultActions = mockMvc.perform(multipart("/api/workspace")
            .file(registerWorkspaceRequestDTO)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceRegResultActions.andExpect(status().isConflict());
        assertThat(workspaceRepository.findByNameAndDeletedAt(workspaceName, null)
            .isPresent());

    }

    @Order(4)
    @Test
    void itShouldGetWorkspaceNameSuccessfully() throws Exception {
        // Give
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String workspaceName = "seoul";
        Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);

        // When
        ResultActions workspaceGetResultActions = mockMvc.perform(get("/api/workspace/info?workspaceId=" + workspace.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceGetResultActions.andExpect(status().isOk());
        JSONObject jsonObject = new JSONObject(workspaceGetResultActions.andReturn().getResponse().getContentAsString());

        assertEquals(jsonObject.getString("name"), "seoul");
    }

    @Order(5)
    @Test
    void itShouldGetWorkspaceNameWhenWorkspaceIdIsWrong() throws Exception {
        // Give
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String wrongWorkspaceId = "1234-1234-1234";

        // When
        ResultActions workspaceGetResultActions = mockMvc.perform(get("/api/workspace/info?workspaceId=" + wrongWorkspaceId)
            .contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceGetResultActions.andExpect(status().isConflict());
    }

//    @Test
//    void itShouldModifyWorkspaceSuccessfully() throws Exception {
//        // Give
//        assertNotNull(token);
//        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");
//
//        String workspaceOriginName = "seoul";
//        String workspaceNewName = "서울";
//        Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceOriginName, null).orElse(null);
//        ModifyWorkspaceRequestDTO workspaceDTO = new ModifyWorkspaceRequestDTO(workspace.getId(), workspaceNewName);
//
//        String modifyWorkspaceRequestDTOJson = Objects.requireNonNull(objectToJson((workspaceDTO)));
//        MockMultipartFile modifyWorkspaceRequestDTO = new MockMultipartFile("modifyWorkspaceRequestDTO", "modifyWorkspaceRequestDTO", "application/json",
//            modifyWorkspaceRequestDTOJson.getBytes());
//
//        // When
//        ResultActions workspaceRegResultActions = mockMvc.perform(multipart("/api/workspace")
//            .file(modifyWorkspaceRequestDTO)
//            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));
//
//        // Then
//        workspaceRegResultActions.andExpect(status().isOk());
//        assertThat(workspaceRepository.findByNameAndDeletedAt(workspaceNewName, null)
//            .isPresent());
//
//    }

    @Order(6)
    @Test
    void itShouldDeleteWorkspaceSuccessfully() throws Exception {
        // Give
        assertNotNull(token);
        assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

        String workspaceName = "daejeon";
        Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);

        // When
        ResultActions workspaceDeleteResultActions = mockMvc.perform(delete("/api/workspace/" + workspace.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

        // Then
        workspaceDeleteResultActions.andExpect(status().isOk());
        assertFalse(workspaceRepository.existsByNameAndDeletedAt(workspaceName, null));

    }

    private String objectToJson(Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (JsonProcessingException e) {
            fail("Failed to convert object to json");
            return null;
        }
    }
}
