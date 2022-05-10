package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
public class ChatMessage  {

    @EmbeddedId
    @Column(name = "chat")
    private Chat chat;

    // 내용
    @Column(name = "content")
    private String content;

    @Column(name = "updated")
    private boolean updated;

    @Column(name = "deleted")
    private boolean deleted;

    // 시간
    @Column(name = "created_at")
    private LocalDateTime sendTime;

    @Embeddable
    @Getter
    public class Chat implements Serializable {

        @Column(name = "chat_id")
        private long chatId;

        @Column(name = "channel_id")
        private String channelId;
    }

}
