package com.tooliv.server.domain.channel.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum ChannelMemberCode implements CommonCode {
    CADMIN("M03", "채널 관리자"),
    CMEMBER("M04", "채널 일반사용자");

    private String code;

    private String description;

    ChannelMemberCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
