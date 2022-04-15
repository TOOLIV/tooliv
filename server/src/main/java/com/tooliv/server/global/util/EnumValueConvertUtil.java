package com.tooliv.server.global.util;

import com.tooliv.server.global.common.CommonCode;
import java.util.EnumSet;
import java.util.NoSuchElementException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

// enum 을 String 과 상호 변환하는 유틸리티 클래스
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EnumValueConvertUtil {

    // code 에 해당하는 Enum 을 반환
    public static <T extends Enum<T> & CommonCode> T ofCode(Class<T> enumClass, String code) {

        if (StringUtils.isBlank(code)) {
            return null;
        }

        return EnumSet.allOf(enumClass).stream()
            .filter(v -> v.getCode().equals(code))
            .findAny()
            .orElseThrow(() -> new NoSuchElementException(
                String.format("enum=[%s], code=[%s]가 존재하지 않습니다.", enumClass.getName(), code)));

    }

    // Enum 의 code 를 반환
    public static <T extends Enum<T> & CommonCode> String toCode(T enumValue) {

        if (enumValue == null) {
            return "";
        }

        return enumValue.getCode();

    }

}
