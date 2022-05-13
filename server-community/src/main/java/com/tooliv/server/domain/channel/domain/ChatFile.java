package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.global.common.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatFile extends BaseEntity {

    @Column(name = "file_name")
    private String fileName;
}
