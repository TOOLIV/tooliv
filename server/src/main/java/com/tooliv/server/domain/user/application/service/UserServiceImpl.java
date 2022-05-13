package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.LogInRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.NicknameUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.PasswordUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.StatusRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.StatusUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.LogInResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.NicknameResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.ProfileInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.StatusListResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.StatusResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.common.AwsS3Service;
import com.tooliv.server.global.exception.UserNotFoundException;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public LogInResponseDTO logIn(LogInRequestDTO logInRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(logInRequestDTO.getEmail(),
                logInRequestDTO.getPassword()));

        String jwt = jwtAuthenticationProvider.createToken(authentication);

        User user = userRepository.findByEmailAndDeletedAt(logInRequestDTO.getEmail(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        user.updateStatusCode(StatusCode.ONLINE);
        userRepository.save(user);

        return LogInResponseDTO.builder()
            .userId(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .nickname(user.getNickname())
            .userCode(user.getUserCode())
            .statusCode(user.getStatusCode())
            .profileImage(awsS3Service.getFilePath(user.getProfileImage()))
            .accessToken(jwt).build();

    }

    @Override
    public ProfileInfoResponseDTO getProfileInfo(String email) {
        User user = userRepository.findByEmailAndDeletedAt(email, null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보 없음"));

        return ProfileInfoResponseDTO.builder()
            .nickname(user.getNickname())
            .statusCode(user.getStatusCode())
            .profileImage(awsS3Service.getFilePath(user.getProfileImage())).build();

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
    public void updateStatus(StatusUpdateRequestDTO statusUpdateRequestDTO) {
        User user = getCurrentUser();

        user.updateStatusCode(statusUpdateRequestDTO.getStatusCode());
        userRepository.save(user);
    }

    @Override
    public void updatePassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO) {
        User user = getCurrentUser();
        user.updatePassword(passwordEncoder.encode(passwordUpdateRequestDTO.getPassword()));

        userRepository.save(user);
    }

    @Override
    public void uploadProfileImage(MultipartFile multipartFile) {
        String fileName = awsS3Service.uploadFile(multipartFile);

        User user = getCurrentUser();
        user.updateProfileImage(fileName);

        userRepository.save(user);
    }

    @Override
    public UserListResponseDTO getUserList(String keyword, int sequence) {
        List<UserInfoResponseDTO> userInfoResponseDTOList = new ArrayList<>();

        for (User user : userRepository.findAllByDeletedAtAndNameContainingOrderByNameAsc(null, keyword, PageRequest.of(sequence - 1, 15, Sort.Direction.ASC, "name"))
            .orElseThrow(() -> new UserNotFoundException("조회 가능한 회원이 없음"))) {
            userInfoResponseDTOList.add(
                new UserInfoResponseDTO(user.getId(), user.getEmail(), user.getName(), user.getNickname(), user.getUserCode(), user.getStatusCode(), awsS3Service.getFilePath(user.getProfileImage())));
        }

        return new UserListResponseDTO(userInfoResponseDTOList, userInfoResponseDTOList.size());
    }

    @Override
    public StatusListResponseDTO getStatusList(StatusRequestDTO statusRequestDTO) {
        List<User> userList = userRepository.findUserIn(statusRequestDTO.getEmailList())
            .orElseThrow(() -> new UserNotFoundException("조회 가능한 회원이 없음"));

        List<StatusResponseDTO> statusResponseDTOList = new ArrayList<>();

        userList.forEach(user -> statusResponseDTOList.add(
            new StatusResponseDTO(user.getEmail(), user.getStatusCode())
        ));

        return new StatusListResponseDTO(statusResponseDTOList);

    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        return user;
    }

    @Override
    public String getUserId(String email) {
        User user = userRepository.findByEmailAndDeletedAt(email, null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        return user.getId();
    }

}
