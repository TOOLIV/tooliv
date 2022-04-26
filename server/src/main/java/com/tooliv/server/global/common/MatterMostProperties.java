package com.tooliv.server.global.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties("notification.mattermost")
@Primary
public class MatterMostProperties {

    private String channel;
    private String pretext;
    private String color = "#ff5d52";
    private String authorName;
    private String authorIcon;
    private String title;
    private String text = "";
    private String footer = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
}
