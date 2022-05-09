package com.tooliv.server.global.util.converter;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter extends AbstractEnumAttributeConverter<StatusCode> {

    public static final String ENUM_NAME = "회원";

    public StatusConverter() {
        super(StatusCode.class, false, ENUM_NAME);
    }

}
