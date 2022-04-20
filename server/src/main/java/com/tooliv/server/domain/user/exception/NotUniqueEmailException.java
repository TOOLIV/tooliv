package com.tooliv.server.domain.user.exception;

public class NotUniqueEmailException extends RuntimeException {

    public NotUniqueEmailException() {

    }

    public NotUniqueEmailException(String message) {
        super(message);
    }
}
