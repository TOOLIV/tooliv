package com.tooliv.server.domain.chat.application.dto.response;

import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.global.common.BaseEntity;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@ApiModel("FileUrlListResponseDTO")
@Getter
public class FileUrlListResponseDTO extends BaseResponseDTO {
    @ApiModelProperty("Aws S3 List 목록")
    private List<String> fileUrlList;

    public FileUrlListResponseDTO() {
    }

    public FileUrlListResponseDTO(List<String> fileUrlList) {
        this.fileUrlList = fileUrlList;
    }

    public static FileUrlListResponseDTO of(String message, FileUrlListResponseDTO fileUrlListResponseDTO) {
        fileUrlListResponseDTO.setMessage(message);

        return fileUrlListResponseDTO;
    }
}
