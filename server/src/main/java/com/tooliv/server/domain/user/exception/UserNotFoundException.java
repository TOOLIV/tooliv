package com.tooliv.server.domain.user.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {

    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
