package com.tooliv.server.global.util.converter;

import com.tooliv.server.domain.channel.domain.enums.ChannelCode;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ChannelConverter extends AbstractEnumAttributeConverter<ChannelCode> {

    public static final String ENUM_NAME = "채널";

    public ChannelConverter() {
        super(ChannelCode.class, false, ENUM_NAME);
    }

}
