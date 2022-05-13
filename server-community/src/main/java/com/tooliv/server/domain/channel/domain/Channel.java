package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.global.common.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

    @Column(name = "wrote_at")
    private LocalDateTime wroteAt;

    @Column(name = "channel_code", nullable = false)
    private ChannelCode channelCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    public void modifyChannel(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void deleteChannel() {
        this.deletedAt = LocalDateTime.now();
    }

    public void updateWroteAt(){
        this.wroteAt = LocalDateTime.now();
    }

}
