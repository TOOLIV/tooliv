package com.tooliv.server.domain.channel.application.dto.response;

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

    @ApiModelProperty("Aws S3 List 목록")
    private List<String> fileList;

    public FileUrlListResponseDTO() {
    }

    public FileUrlListResponseDTO(List<String> fileUrlList,List<String> fileList) {
        this.fileUrlList = fileUrlList;
        this.fileList = fileList;
    }

    public static FileUrlListResponseDTO of(String message, FileUrlListResponseDTO fileUrlListResponseDTO) {
        fileUrlListResponseDTO.setMessage(message);

        return fileUrlListResponseDTO;
    }
}
