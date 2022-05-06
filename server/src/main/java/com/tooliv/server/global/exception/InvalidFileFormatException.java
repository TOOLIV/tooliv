package com.tooliv.server.global.exception;

public class InvalidFileFormatException extends RuntimeException {

    public InvalidFileFormatException() {

    }

    public InvalidFileFormatException(String message) {
        super(message);
    }

}
