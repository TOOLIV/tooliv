package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    private final UserRepository userRepository;

    @Override
    public void signUp(SignUpRequestDTO signUpRequestDTO) {
        User user = User.builder()
            .email(signUpRequestDTO.getEmail())
            .name(signUpRequestDTO.getName())
            .nickname(signUpRequestDTO.getName())
            .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
            .createdAt(LocalDateTime.now())
            .userCode(signUpRequestDTO.getUserCode()).build();

        userRepository.save(user);
    }

    @Override
    public LogInResponseDTO logIn(LogInRequestDTO logInRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(logInRequestDTO.getEmail(),
                logInRequestDTO.getPassword()));

        User user = userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        String jwt = jwtAuthenticationProvider.createToken(authentication);

        return LogInResponseDTO.builder()
            .userId(user.getId())
            .name(user.getName())
            .nickname(user.getNickname())
            .userCode(user.getUserCode())
            .accessToken(jwt).build();
    }

    @Override
    public NicknameResponseDTO updateNickname(
        NicknameUpdateRequestDTO nicknameUpdateRequestDTO) {
        String nickname = nicknameUpdateRequestDTO.getNickname();

        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        user.updateNickname(nickname, LocalDateTime.now());

        userRepository.save(user);

        return NicknameResponseDTO.builder()
            .nickname(nickname).build();
    }

    @Override
    public void deleteUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        user.deleteUser(LocalDateTime.now());

        userRepository.save(user);
    }

}
