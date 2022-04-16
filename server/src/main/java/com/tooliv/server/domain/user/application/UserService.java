package com.tooliv.server.domain.user.application;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;

public interface UserService {

    void signUp(SignUpRequestDTO signUpRequestDTO);

    void logIn(LogInRequestDTO logInRequestDTO);
}
