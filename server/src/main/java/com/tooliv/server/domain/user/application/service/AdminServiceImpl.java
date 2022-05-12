package com.tooliv.server.domain.user.application.service;

import com.tooliv.server.domain.user.application.dto.request.SignUpRequestDTO;
import com.tooliv.server.domain.user.application.dto.request.UserCodeUpdateRequestDTO;
import com.tooliv.server.domain.user.application.dto.response.TotalUsersResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserInfoResponseDTO;
import com.tooliv.server.domain.user.application.dto.response.UserListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.common.AwsS3Service;
import com.tooliv.server.global.exception.DuplicateEmailException;
import com.tooliv.server.global.exception.UserNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

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
            .statusCode(StatusCode.OFFLINE)
            .createdAt(LocalDateTime.now()).build();

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
    public TotalUsersResponseDTO getTotalUsers() {
        int numOfUsers = userRepository.findAllUserNotDeleted()
            .orElseThrow(() -> new UserNotFoundException("조회 가능한 회원이 없음"));

        return new TotalUsersResponseDTO(numOfUsers);
    }

    @Override
    public void updateUserCode(UserCodeUpdateRequestDTO userCodeUpdateRequestDTO) {
        User user = userRepository.findByEmailAndDeletedAt(userCodeUpdateRequestDTO.getEmail(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        user.updateUserCode(userCodeUpdateRequestDTO.getUserCode());

        userRepository.save(user);
    }

    @Override
    public void deleteUser(String email) {
        System.out.println("email : " + email);
        User user = userRepository.findByEmailAndDeletedAt(email, null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        user.deleteUser(LocalDateTime.now());

        userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        return user;
    }

    @Override
    public void checkEmail(String email) {
        boolean emailExists = userRepository.existsByEmailAndDeletedAt(email, null);

        if (emailExists) {
            throw new DuplicateEmailException("해당 이메일은 중복임");
        }
    }

}
