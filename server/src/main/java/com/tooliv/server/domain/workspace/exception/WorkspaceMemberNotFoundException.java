package com.tooliv.server.domain.workspace.exception;

public class WorkspaceMemberNotFoundException extends RuntimeException {

    public WorkspaceMemberNotFoundException() {

    }

    public WorkspaceMemberNotFoundException(String message) {
        super(message);
    }
}
