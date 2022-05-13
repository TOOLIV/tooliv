package com.tooliv.server.domain.channel.execption;

public class DuplicateChannelException extends RuntimeException {

    public DuplicateChannelException() {

    }

    public DuplicateChannelException(String message) {
        super(message);
    }

}
