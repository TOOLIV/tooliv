package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class DirectChatRoomMembers extends BaseEntity {
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "logged_at")
    private LocalDateTime loggedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "directChatRoom_id")
    private DirectChatRoom directChatRoom;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void updateLoggedAt(){
        this.loggedAt = LocalDateTime.now();
    }
}
