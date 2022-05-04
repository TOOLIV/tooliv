package com.tooliv.server;

import com.tooliv.server.domain.user.api.UserControllerTest;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
@Transactional
@ActiveProfiles("test")
@Testcontainers
public class BaseIntegrationTest {

    static Logger LOGGER = LoggerFactory.getLogger(UserControllerTest.class);

    @Autowired
    protected MockMvc mockMvc;

    @Container
    private static MySQLContainer<?> mySQLContainer = new MySQLContainer<>(DockerImageName.parse("mysql:5.7"))
        .withDatabaseName("test-db");

    @BeforeAll
    static void beforeAll() {
        Slf4jLogConsumer logConsumer = new Slf4jLogConsumer(LOGGER);
        mySQLContainer.followOutput(logConsumer);
    }
}
