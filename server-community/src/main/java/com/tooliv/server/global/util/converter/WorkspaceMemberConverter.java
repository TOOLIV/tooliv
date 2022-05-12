package com.tooliv.server.global.util.converter;

import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class WorkspaceMemberConverter extends AbstractEnumAttributeConverter<WorkspaceMemberCode> {

    public static final String ENUM_NAME = "워크스페이스멤버";

    public WorkspaceMemberConverter() {
        super(WorkspaceMemberCode.class, false, ENUM_NAME);
    }

}
