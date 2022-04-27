package com.tooliv.server.domain.chat.api;

import com.tooliv.server.domain.chat.application.ChatService;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomChatListResponseDTO;
import com.tooliv.server.domain.chat.application.dto.response.FileUrlListResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Api(value = "AwsS3Controller API", tags = {"AwsS3"})
@RequiredArgsConstructor
public class AwsS3Controller {

    private final ChatService chatService;

    @PostMapping("/api/fileUpload")
    @ApiOperation(value = "파일 등록")
    @ApiResponses({
        @ApiResponse(code = 201, message = "파일 등록 완료"),
        @ApiResponse(code = 409, message = "파일 등록 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> uploadProfileImage(
        @ApiParam(value = "이미지", required = true) @RequestPart List<MultipartFile> multipartFiles) {
        FileUrlListResponseDTO fileUrlListResponseDTO = null;
        try {
            fileUrlListResponseDTO = chatService.getFileURL(multipartFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(BaseResponseDTO.of("파일 등록 실패"));
        }
        return ResponseEntity.status(200).body(FileUrlListResponseDTO.of("파일 등록 완료", fileUrlListResponseDTO));
    }
}
