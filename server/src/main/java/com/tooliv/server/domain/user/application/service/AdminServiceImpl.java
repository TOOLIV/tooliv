package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.UserInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.domain.user.exception.NotUniqueEmailException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(SignUpRequestDTO signUpRequestDTO) {
        User user = User.builder()
            .email(signUpRequestDTO.getEmail())
            .name(signUpRequestDTO.getName())
            .nickname(signUpRequestDTO.getName())
            .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
            .userCode(UserCode.USER)
            .createdAt(LocalDateTime.now()).build();

        userRepository.save(user);
    }

    @Override
    public UserListResponseDTO getUserList() {
        List<UserInfoResponseDTO> userInfoResponseDTOList = new ArrayList<>();

        for (User user : userRepository.findAllByUserCodeAndDeletedAtOrderByNameAsc(UserCode.USER, null).orElseThrow(() -> new IllegalArgumentException("조회 가능한 회원이 없음"))) {
            userInfoResponseDTOList.add(new UserInfoResponseDTO(user.getId(), user.getEmail(), user.getName(), user.getNickname()));
        }

        return new UserListResponseDTO(userInfoResponseDTOList);
    }

    @Override
    public void checkEmail(String email) throws NotUniqueEmailException {
        boolean emailExists = userRepository.existsByEmailAndDeletedAt(email, null);

        if (emailExists) {
            throw new NotUniqueEmailException("해당 이메일은 중복임");
        }
    }
}
