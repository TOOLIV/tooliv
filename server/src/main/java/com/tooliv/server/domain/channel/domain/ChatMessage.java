package com.tooliv.server.domain.channel.domain;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
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
public class ChatMessage extends BaseEntity {

    // 내용
    @Column(name = "content")
    private String content;

    // 시간
    @Column(name = "created_at")
    private LocalDateTime sendTime;

    // 채팅방 => 채널방으로 변경의 여지가 있다.
    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    // 작성자
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User sender;

    @Column(name = "type")
    private MessageType type; // 메시지 타입

    public enum MessageType {
        ENTER, QUIT, TALK
    }
}
