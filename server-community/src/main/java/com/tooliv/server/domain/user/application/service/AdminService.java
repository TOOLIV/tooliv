package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.UserCodeUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;

public interface AdminService {

    UserListResponseDTO getUserList(String searchStr);

    void updateUserCode(UserCodeUpdateRequestDTO userCodeUpdateRequestDTO);

    void deleteUser(String email);

    User getCurrentUser();

}
