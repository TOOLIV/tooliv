package com.tooliv.server.domain.channel.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum MemberCode implements CommonCode {
    OWNER("M01", "소유자"),
    GENERAL("M02", "일반사용자");

    private String code;

    private String description;

    MemberCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
