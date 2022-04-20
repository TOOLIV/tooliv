package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.UserCodeUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.exception.NotUniqueEmailException;

public interface AdminService {

    void signUp(SignUpRequestDTO signUpRequestDTO);

    UserListResponseDTO getUserList();

    void updateUserCode(UserCodeUpdateRequestDTO userCodeUpdateRequestDTO);

    void checkEmail(String email) throws NotUniqueEmailException;
}
