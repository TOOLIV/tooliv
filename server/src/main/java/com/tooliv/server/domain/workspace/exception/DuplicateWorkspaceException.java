package com.tooliv.server.domain.workspace.exception;

public class DuplicateWorkspaceException extends RuntimeException {

    public DuplicateWorkspaceException() {

    }

    public DuplicateWorkspaceException(String message) {
        super(message);
    }

}
