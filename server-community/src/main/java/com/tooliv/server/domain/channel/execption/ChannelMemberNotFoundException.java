package com.tooliv.server.domain.channel.execption;

public class ChannelMemberNotFoundException extends RuntimeException {

    public ChannelMemberNotFoundException() {

    }

    public ChannelMemberNotFoundException(String message) {
        super(message);
    }
}
