package com.tooliv.server.domain.workspace.domain.enums;

import com.tooliv.server.global.common.CommonCode;
import lombok.Getter;

@Getter
public enum WorkspaceMemberCode implements CommonCode {
    WADMIN("M01", "워크스페이스 관리자"),
    WMEMBER("M02", "워크스페이스 일반사용자");

    private String code;

    private String description;

    WorkspaceMemberCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
