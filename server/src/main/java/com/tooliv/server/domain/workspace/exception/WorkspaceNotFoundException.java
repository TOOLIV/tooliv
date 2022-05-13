package com.tooliv.server.domain.workspace.exception;

public class WorkspaceNotFoundException extends RuntimeException {

    public WorkspaceNotFoundException() {

    }

    public WorkspaceNotFoundException(String message) {
        super(message);
    }
}
