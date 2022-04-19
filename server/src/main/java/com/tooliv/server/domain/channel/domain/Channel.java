package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.global.common.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Channel extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "private_yn", columnDefinition="BOOLEAN DEFAULT false")
    private boolean privateYn;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "channel_code", nullable = false)
    private ChannelCode channelCode;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    public void modifyChannel(String name, String description) {
        this.name = name;
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public void deleteChannel() {
        this.deletedAt = LocalDateTime.now();
    }

}