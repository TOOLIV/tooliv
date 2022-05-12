package com.tooliv.server.domain.workspace;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tooliv.server.BaseIntegrationTest;
import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceMemberRequestDTO;
import com.tooliv.server.domain.workspace.application.dto.request.RegisterWorkspaceRequestDTO;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceMemberRepository;
import com.tooliv.server.domain.workspace.domain.repository.WorkspaceRepository;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.ClassOrderer;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestClassOrder;
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
@TestClassOrder(ClassOrderer.OrderAnnotation.class)
@SpringBootTest
@AutoConfigureMockMvc
public class WorkspaceChannelIntegrationTest extends BaseIntegrationTest {

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

    @Autowired
    WorkspaceMemberRepository workspaceMemberRepository;

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
                .statusCode(StatusCode.OFFLINE)
                .build();

            userRepository.save(user);
        }

        LogInRequestDTO logInRequestDTO = new LogInRequestDTO("kimssafy@test.com", "1234");

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(logInRequestDTO.getEmail(),
                logInRequestDTO.getPassword()));

        token = jwtAuthenticationProvider.createToken(authentication);
    }

    @Nested
    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
    @Order(1)
    class WorkspaceIntegrationTest {

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
        void itShouldNotGetWorkspaceNameWhenWorkspaceIdIsWrong() throws Exception {
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

        @Nested
        @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
        class WorkspaceMemberIntegrationTest {

            @Order(1)
            @Test
            void itShouldRegisterWorkspaceMemberSuccessfully() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                User parkUser = userRepository.findByEmailAndDeletedAt("parkssafy@test.com", null).orElse(null);
                User sonUser = userRepository.findByEmailAndDeletedAt("sonssafy@test.com", null).orElse(null);

                List<String> emailList = new ArrayList<>();
                emailList.add(parkUser.getEmail());
                emailList.add(sonUser.getEmail());
                RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO = new RegisterWorkspaceMemberRequestDTO(emailList);

                String workspaceName = "seoul";
                Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);
                String workspaceId = workspace.getId();

                // When
                ResultActions workspaceMemberRegResultActions = mockMvc.perform(post("/api/workspace/" + workspaceId + "/member")
                    .content(objectToJson(registerWorkspaceMemberRequestDTO))
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberRegResultActions.andExpect(status().isCreated());
                assertThat(workspaceMemberRepository.findByWorkspaceAndUser(workspace, parkUser)
                    .isPresent());
                assertThat(workspaceMemberRepository.findByWorkspaceAndUser(workspace, sonUser)
                    .isPresent());

            }

            @Order(2)
            @Test
            void itShouldNotRegisterWorkspaceMemberWhenWorkspaceIdIsWrong() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                List<String> emailList = new ArrayList<>();
                emailList.add("leessafy@test.com");
                emailList.add("songssafy@test.com");
                RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO = new RegisterWorkspaceMemberRequestDTO(emailList);

                String workspaceId = "1234-1234-1234";

                // When
                ResultActions workspaceMemberRegResultActions = mockMvc.perform(post("/api/workspace/" + workspaceId + "/member")
                    .content(objectToJson(registerWorkspaceMemberRequestDTO))
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberRegResultActions.andExpect(status().isConflict());
            }

            @Order(3)
            @Test
            void itShouldNotRegisterWorkspaceMemberWhenEmailIsWrong() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                List<String> emailList = new ArrayList<>();
                emailList.add("leessafy@test.com");
                emailList.add("soapssafy@test.com");
                RegisterWorkspaceMemberRequestDTO registerWorkspaceMemberRequestDTO = new RegisterWorkspaceMemberRequestDTO(emailList);

                String workspaceName = "seoul";
                Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);
                String workspaceId = workspace.getId();

                // When
                ResultActions workspaceMemberRegResultActions = mockMvc.perform(post("/api/workspace/" + workspaceId + "/member")
                    .content(objectToJson(registerWorkspaceMemberRequestDTO))
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberRegResultActions.andExpect(status().isConflict());
            }

            @Order(4)
            @Test
            void itShouldDeleteWorkspaceMemberSuccessfully() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                String deleteEmail = "parkssafy@test.com";

                String workspaceName = "seoul";
                Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);
                String workspaceId = workspace.getId();

                // When
                ResultActions workspaceMemberDeleteResultActions = mockMvc.perform(delete("/api/workspace/" + workspaceId + "/member?email=" + deleteEmail)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberDeleteResultActions.andExpect(status().isOk());
            }

            @Order(5)
            @Test
            void itShouldNotDeleteWorkspaceMemberWhenEmailIsInvalid() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                String invalidEmail = "wrongssafy@test.com";

                String workspaceName = "seoul";
                Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);
                String workspaceId = workspace.getId();

                // When
                ResultActions workspaceMemberDeleteResultActions = mockMvc.perform(delete("/api/workspace/" + workspaceId + "/member?email=" + invalidEmail)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberDeleteResultActions.andExpect(status().isConflict());
            }

            @Order(6)
            @Test
            void itShouldNotDeleteWorkspaceMemberWhenWorkspaceIsInvalid() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                String deleteEmail = "parkssafy@test.com";

                String invalidWorkspaceId = "1234-1234-1234";

                // When
                ResultActions workspaceMemberDeleteResultActions = mockMvc.perform(delete("/api/workspace/" + invalidWorkspaceId + "/member?email=" + deleteEmail)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberDeleteResultActions.andExpect(status().isConflict());
            }

            @Order(7)
            @Test
            void itShouldGetWorkspaceMemberForRegistrationSuccessfully() throws Exception {
                // Give
                assertNotNull(token);
                assertEquals(jwtAuthenticationProvider.getEmail(token), "kimssafy@test.com");

                String deleteEmail = "parkssafy@test.com";

                String workspaceName = "seoul";
                Workspace workspace = workspaceRepository.findByNameAndDeletedAt(workspaceName, null).orElse(null);
                String workspaceId = workspace.getId();

                // When
                ResultActions workspaceMemberDeleteResultActions = mockMvc.perform(delete("/api/workspace/" + workspaceId + "/member?email=" + deleteEmail)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token));

                // Then
                workspaceMemberDeleteResultActions.andExpect(status().isOk());
            }
        }
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
