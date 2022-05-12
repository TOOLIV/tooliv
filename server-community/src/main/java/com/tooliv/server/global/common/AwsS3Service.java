package com.tooliv.server.global.common;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {

    String uploadFile(MultipartFile multipartFile);

    String createFileName(String fileName);

    String getFileExtension(String fileName);

    String getFilePath(String newFileName);

}
