package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.exception.NotUniqueEmailException;

public interface AdminService {

    UserListResponseDTO getUserList();

    void checkEmail(String email) throws NotUniqueEmailException;
}
