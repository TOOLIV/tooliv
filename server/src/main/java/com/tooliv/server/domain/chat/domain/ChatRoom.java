package com.tooliv.server.domain.chat.domain;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.global.common.BaseEntity;
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
public class ChatRoom extends BaseEntity {

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User customer;

    // 채팅 방 생성
    public static ChatRoom create(String name, User customer) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.name = name;
        chatRoom.customer = customer;
        return chatRoom;
    }
}
