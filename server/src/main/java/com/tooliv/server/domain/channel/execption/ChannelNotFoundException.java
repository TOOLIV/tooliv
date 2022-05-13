package com.tooliv.server.domain.channel.execption;

public class ChannelNotFoundException extends RuntimeException {

    public ChannelNotFoundException() {

    }

    public ChannelNotFoundException(String message) {
        super(message);
    }
}
