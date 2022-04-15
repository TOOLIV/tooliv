package com.tooliv.server.global.util.converter;

import com.tooliv.server.domain.user.domain.enums.UserCode;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class UserConverter extends AbstractEnumAttributeConverter<UserCode> {

    public static final String ENUM_NAME = "회원";

    public UserConverter() {
        super(UserCode.class, false, ENUM_NAME);
    }

}
