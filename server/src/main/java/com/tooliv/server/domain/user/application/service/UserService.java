package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void signUp(SignUpRequestDTO signUpRequestDTO);

    LogInResponseDTO logIn(LogInRequestDTO logInRequestDTO);

    NicknameResponseDTO updateNickname(NicknameUpdateRequestDTO nicknameUpdateRequestDTO);

    void uploadProfileImage(MultipartFile multipartFile);

    void checkEmail(String email);

    UserListResponseDTO getUserList(String keyword);

    User getCurrentUser();

    String getImageURL(String fileName);

    String getUserId(String email);
}
