package com.tooliv.server.domain.user.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndDeletedAt(String email, LocalDateTime localDateTime);

    Optional<User> findByIdAndDeletedAt(String id, LocalDateTime localDateTime);

    Optional<User> findByEmailAndDeletedAt(String email, LocalDateTime localDateTime);

    Optional<User> findByNickname(String nickname);

    Optional<List<User>> findAllByUserCodeNotAndDeletedAtOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime);

    Optional<List<User>> findAllByDeletedAtAndUserCodeNotAndNameContainingOrderByNameAsc(LocalDateTime localDateTime, UserCode userCode, String keyword, Pageable pageable);

    Optional<List<User>> findAllByUserCodeNotAndDeletedAtAndNameContainingOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime, String keyword, Pageable pageable);

    Optional<List<User>> findAllByUserCodeNotAndDeletedAtAndNameContainingOrderByNameAsc(UserCode userCode, LocalDateTime localDateTime, String keyword);

    @Query(value = "SELECT count(*) FROM user u WHERE u.deleted_at IS NULL", nativeQuery = true)
    Optional<Integer> findAllUserNotDeleted();

    @Query(value = "SELECT * FROM user u WHERE u.email IN :emailList", nativeQuery = true)
    Optional<List<User>> findUserIn(String[] emailList);

    @Query(value = "SELECT * \n"
        + "FROM user u\n"
        + "WHERE u.deleted_at IS NULL  AND u.name LIKE %:keyword% AND u.id NOT IN (\n"
        + "SELECT DISTINCT m.user_id\n"
        + "FROM workspace_members m\n"
        + "JOIN workspace w ON m.workspace_id = w.id \n"
        + " WHERE w.id = :workspace_id  AND w.deleted_at IS NULL\n"
        + ")\n"
        + "ORDER BY u.name LIMIT :offset, 10", nativeQuery = true)
    List<User> findAllToRegisterWorkspaceMember(@Param("workspace_id") String workspaceId, @Param("keyword") String keyword, @Param("offset") int offset);

}
