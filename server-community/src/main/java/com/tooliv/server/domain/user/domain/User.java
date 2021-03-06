package com.tooliv.server.domain.user.domain;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.global.common.BaseEntity;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity implements Serializable {

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "user_code")
    private UserCode userCode;

    @Column(name = "status_code")
    private StatusCode statusCode;

    @Column(name = "profile_image")
    private String profileImage;

    public void updateNickname(String nickname, LocalDateTime localDateTime) {
        this.nickname = nickname;
        this.updatedAt = localDateTime;
    }

    public void deleteUser(LocalDateTime localDateTime) {
        this.deletedAt = localDateTime;
    }

    public void updateUserCode(UserCode userCode) {
        this.userCode = userCode;
    }

    public void updateProfileImage(String fileName) {
        this.profileImage = fileName;
    }

    public void updateStatusCode(StatusCode statusCode) {
        this.statusCode = statusCode;
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
