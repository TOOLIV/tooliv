package com.tooliv.server.domain.user.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmailAndDeletedAt(String email, LocalDateTime localDateTime);

    Optional<User> findByEmailAndDeletedAt(String email, LocalDateTime localDateTime);

    Optional<User> findByNickname(String nickname);

    Optional<List<User>> findAllByUserCodeNotAndDeletedAtOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime);

//    @Query(value = "SELECT v FROM User v WHERE v.name Like %:keyword% AND v.userCode Not Like :userCode And v.deletedAt = :deletedAt order by v.name asc")
//    List<User> findUser(@Param("keyword")String keyword, @Param("userCode")UserCode userCode, @Param("deletedAt")LocalDateTime localDateTime);

    Optional<List<User>> findAllByUserCodeNotAndDeletedAtAndNameContainingOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime, String keyword);
}
