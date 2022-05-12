package com.tooliv.server.domain.workspace.utils;

import java.util.function.Predicate;

public class WorkspaceValidator implements Predicate<String> {

    @Override
    public boolean test(String workspaceName) {
        return false;
    }
}
