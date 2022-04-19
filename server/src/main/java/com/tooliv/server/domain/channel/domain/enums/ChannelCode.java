package com.tooliv.server.domain.channel.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum ChannelCode implements CommonCode {
    CHAT("C01", "채팅"),
    VIDEO("C02", "비디오");

    private String code;

    private String description;

    ChannelCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
