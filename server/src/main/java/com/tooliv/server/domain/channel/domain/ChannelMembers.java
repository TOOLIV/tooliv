package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
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
public class ChannelMembers extends BaseEntity {

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "logged_at")
    private LocalDateTime loggedAt;

    @Column(name = "channel_member_code")
    private ChannelMemberCode channelMemberCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void updateLoggedAt(){
        this.loggedAt = LocalDateTime.now();
    }
}
