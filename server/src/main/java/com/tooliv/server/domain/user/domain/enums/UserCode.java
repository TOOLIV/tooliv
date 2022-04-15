package com.tooliv.server.domain.user.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum UserCode implements CommonCode {
    ADMIN("U01", "관리자"),
    USER("U02", "사용자");

    private String code;

    private String description;

    UserCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
