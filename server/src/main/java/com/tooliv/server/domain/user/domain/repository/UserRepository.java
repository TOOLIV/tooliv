package com.tooliv.server.domain.user.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmailAndDeletedAt(String email, LocalDateTime localDateTime);

    Optional<User> findByNickname(String nickname);

    Optional<List<User>> findAllByUserCodeAndDeletedAtOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime);
}
