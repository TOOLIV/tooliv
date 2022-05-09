package com.tooliv.server.domain.user.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum StatusCode implements CommonCode {

    ONLINE("S01","온라인"),
    AWAY("S02","다른 용무 중"),
    OFFLINE("S03","오프라인");

    private String code;

    private String description;

    StatusCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
