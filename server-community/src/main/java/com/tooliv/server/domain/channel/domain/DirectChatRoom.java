package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
public class DirectChatRoom extends BaseEntity {


    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "wrote_at")
    private LocalDateTime wroteAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id1")
    private User user1;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id2")
    private User user2;

    public void updateWroteAt(){
        this.wroteAt = LocalDateTime.now();
    }
}
