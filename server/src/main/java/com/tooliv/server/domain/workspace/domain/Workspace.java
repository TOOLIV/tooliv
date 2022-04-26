package com.tooliv.server.domain.workspace.domain;

import com.tooliv.server.global.common.BaseEntity;
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
public class Workspace extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "thumbnail_image")
    private String thumbnailImage;

    public void modifyWorkspace(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void deleteWorkspace() {
        this.deletedAt = LocalDateTime.now();
    }

}
