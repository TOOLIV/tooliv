package com.tooliv.server.domain.channel.execption;

public class WebhookNotFoundException extends RuntimeException {

    public WebhookNotFoundException() {

    }

    public WebhookNotFoundException(String message) {
        super(message);
    }

}
