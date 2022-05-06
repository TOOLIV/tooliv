package com.tooliv.server;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {

    @Test
    void contextLoads() {
        System.out.println(jasyptEncoding("k6a402.p.ssafy.io"));
    }
    public String jasyptEncoding(String value) {
        String key = "tooliv-jasypt";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.encrypt(value);
    }

}
