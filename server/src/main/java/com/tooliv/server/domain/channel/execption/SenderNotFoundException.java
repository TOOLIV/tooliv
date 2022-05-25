package com.tooliv.server.domain.channel.execption;

public class SenderNotFoundException extends RuntimeException {

    public SenderNotFoundException() {

    }

    public SenderNotFoundException(String message) {
        super(message);
    }
}
