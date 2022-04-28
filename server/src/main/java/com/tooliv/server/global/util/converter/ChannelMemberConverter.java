package com.tooliv.server.global.util.converter;

import com.tooliv.server.domain.channel.domain.enums.ChannelMemberCode;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ChannelMemberConverter extends AbstractEnumAttributeConverter<ChannelMemberCode> {

    public static final String ENUM_NAME = "채널멤버";

    public ChannelMemberConverter() {
        super(ChannelMemberCode.class, false, ENUM_NAME);
    }

}
