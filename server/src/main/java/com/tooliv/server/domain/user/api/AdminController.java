package com.tooliv.server.domain.user.api;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Admin API", tags = {"Admin"})
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

}
