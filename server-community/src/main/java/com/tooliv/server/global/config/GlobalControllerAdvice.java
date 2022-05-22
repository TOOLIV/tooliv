package com.tooliv.server.global.config;

import com.tooliv.server.domain.channel.application.dto.request.WebhookMessageRequestDTO;
import com.tooliv.server.global.common.NotificationManager;
import com.tooliv.server.global.exception.DuplicateEmailException;
import com.tooliv.server.global.exception.UserNotFoundException;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@ControllerAdvice
public class GlobalControllerAdvice {

    @Autowired
    private NotificationManager notificationManager;

    @Autowired
    private RestTemplate restTemplate;

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity handleUserNotFoundException(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        notificationManager.sendNotification(e, req.getMethod(), req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity handleDuplicateEmailException(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        notificationManager.sendNotification(e, req.getMethod(), req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleMethodArgumentNotValidException(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        notificationManager.sendNotification(e, req.getMethod(), req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleAllException(Exception e, HttpServletRequest req) {
        e.printStackTrace();
//        WebhookMessageRequestDTO webhookMessageRequestDTO = WebhookMessageRequestDTO.builder()
//                .webhook_id("039a1907-5ff5-406d-ba7d-e09338d59eb5")
//                .content("<p>" + e.getMessage() + "</p>").build();

        HttpHeaders test_headers = new HttpHeaders();
        test_headers.setContentType(MediaType.APPLICATION_JSON);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("content", "<p>" + e.getMessage() + "</p>");
        body.add("webhook_id", "039a1907-5ff5-406d-ba7d-e09338d59eb5");

        HttpEntity<?> requestMessage = new HttpEntity<>(body, test_headers);

        restTemplate.postForEntity("https://k6a402.p.ssafy.io:8443/api/webhook/message", requestMessage, String.class);

        notificationManager.sendNotification(e, req.getMethod(), req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
        }

        return params.toString();
    }
}
