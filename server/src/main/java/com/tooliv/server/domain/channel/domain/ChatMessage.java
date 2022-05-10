package com.tooliv.server.domain.channel.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
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
public class ChatMessage {

    @EmbeddedId
    @Column(name = "chat")
    private Chat chat;

    @Column(name = "content")
    private String content;

    @Column(name = "updated")
    private boolean updated;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_at")
    private LocalDateTime sendTime;

    public void updateChat(){
        this.updated = true;
    }

    public void deleteChat(){
        this.deleted = true;
    }

    @Embeddable
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Chat implements Serializable {

        @Column(name = "chat_id")
        private long chatId;

        @Column(name = "channel_id")
        private String channelId;

    }

}
