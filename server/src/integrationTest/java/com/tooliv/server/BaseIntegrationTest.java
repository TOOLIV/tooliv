package com.tooliv.server;

import com.tooliv.server.domain.user.api.UserControllerTest;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Disabled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
@Disabled
@AutoConfigureMockMvc
@Rollback(value = false)
@ActiveProfiles("test")
@Testcontainers
public class BaseIntegrationTest {

    static Logger LOGGER = LoggerFactory.getLogger(UserControllerTest.class);

    @Autowired
    protected MockMvc mockMvc;

    @Container
    private static MySQLContainer<?> mySQLContainer = new MySQLContainer<>(DockerImageName.parse("mysql:5.7"))
        .withDatabaseName("test_db");
//        .withConfigurationOverride("mysql_conf_override")
//        .withCommand("--character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci")
//        .withEnv("MYSQL_ROOT_HOST", "%")
//        .withInitScript("schema.sql");

    @AfterAll
    static void afterAll() {

        System.out.println("야야야야야양 좀 되라고요`~~~~~~~");
        System.out.println(mySQLContainer.getEnv());
        System.out.println(mySQLContainer.getJdbcUrl());
        for (String s : mySQLContainer.getCommandParts()) {
            System.out.println(s);
        }
        Slf4jLogConsumer logConsumer = new Slf4jLogConsumer(LOGGER);
        mySQLContainer.followOutput(logConsumer);
    }
}