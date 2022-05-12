package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.PasswordUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.StatusRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.StatusUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.ProfileInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.StatusListResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void signUp(SignUpRequestDTO signUpRequestDTO);

    LogInResponseDTO logIn(LogInRequestDTO logInRequestDTO);

    ProfileInfoResponseDTO getProfileInfo(String email);

    NicknameResponseDTO updateNickname(NicknameUpdateRequestDTO nicknameUpdateRequestDTO);

    void updateStatus(StatusUpdateRequestDTO statusUpdateRequestDTO);

    void updatePassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO);

    void uploadProfileImage(MultipartFile multipartFile);

    void checkEmail(String email);

    UserListResponseDTO getUserList(String keyword, int sequence);

    StatusListResponseDTO getStatusList(StatusRequestDTO statusRequestDTO);

    User getCurrentUser();

    String getUserId(String email);
}
