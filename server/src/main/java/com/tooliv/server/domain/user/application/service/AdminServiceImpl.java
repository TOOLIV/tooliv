package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.response.UserInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    @Override
    public UserListResponseDTO getUserList() {
        List<UserInfoResponseDTO> userInfoResponseDTOList = new ArrayList<>();

        for (User user : userRepository.findAllByUserCodeAndDeletedAtOrderByNameAsc(UserCode.USER, null).orElseThrow(() -> new IllegalArgumentException("조회 가능한 회원이 없음"))) {
            userInfoResponseDTOList.add(new UserInfoResponseDTO(user.getId(), user.getEmail(), user.getName(), user.getNickname()));
        }

        return new UserListResponseDTO(userInfoResponseDTOList);
    }
}
