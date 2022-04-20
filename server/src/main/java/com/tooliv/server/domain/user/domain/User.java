package com.tooliv.server.domain.user.domain;

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

    @Column(name = "email")
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

    @Column(name = "code")
    private UserCode userCode;

    public void updateNickname(String nickname, LocalDateTime localDateTime) {
        this.nickname = nickname;
        this.updatedAt = localDateTime;
    }

    public void deleteUser(LocalDateTime localDateTime) {
        this.deletedAt = localDateTime;
    }
}
