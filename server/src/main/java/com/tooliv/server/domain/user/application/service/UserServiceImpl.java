package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.exception.DuplicateEmailException;
import com.tooliv.server.global.common.AwsS3Service;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationManager authenticationManager;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    private final UserRepository userRepository;

    private final AwsS3Service awsS3Service;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(SignUpRequestDTO signUpRequestDTO) {
        checkEmail(signUpRequestDTO.getEmail());

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
            .profileImage(getImageURL(user.getProfileImage()))
            .accessToken(jwt).build();
    }

    @Override
    public NicknameResponseDTO updateNickname(
        NicknameUpdateRequestDTO nicknameUpdateRequestDTO) {
        String nickname = nicknameUpdateRequestDTO.getNickname();

        User user = getCurrentUser();

        user.updateNickname(nickname, LocalDateTime.now());

        userRepository.save(user);

        return NicknameResponseDTO.builder()
            .nickname(nickname).build();
    }

    @Override
    public void uploadProfileImage(MultipartFile multipartFile) {
        String fileName = awsS3Service.uploadFile(multipartFile);

        User user = getCurrentUser();
        user.updateProfileImage(fileName);

        userRepository.save(user);
    }

    @Override
    public void checkEmail(String email) {
        boolean emailExists = userRepository.existsByEmailAndDeletedAt(email, null);

        if (emailExists) {
            throw new DuplicateEmailException("해당 이메일은 중복임");
        }
    }


    @Override
    public UserListResponseDTO getUserList(String keyword) {
        List<UserInfoResponseDTO> userInfoResponseDTOList = new ArrayList<>();

        for (User user : userRepository.findAllByDeletedAtAndNameContainingOrderByNameAsc(null, keyword)
            .orElseThrow(() -> new IllegalArgumentException("조회 가능한 회원이 없음"))) {
            userInfoResponseDTOList.add(new UserInfoResponseDTO(user.getId(), user.getEmail(), user.getName(), user.getNickname(), user.getUserCode(), getImageURL(user.getProfileImage())));
        }

        return new UserListResponseDTO(userInfoResponseDTOList, userInfoResponseDTOList.size());
    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        return user;
    }

    @Override
    public String getImageURL(String fileName) {
        return "https://tooliva402.s3.ap-northeast-2.amazonaws.com/" + fileName;
    }

}
