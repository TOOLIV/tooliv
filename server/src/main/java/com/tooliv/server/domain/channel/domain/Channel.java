package com.tooliv.server.domain.channel.domain;

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

    @Column(name = "video_yn", columnDefinition="BOOLEAN DEFAULT false")
    private boolean videoYn;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    public void modifyChannel(String name, boolean privateYn, String description) {
        this.name = name;
        this.privateYn = privateYn;
        this.description = description;
    }

}
