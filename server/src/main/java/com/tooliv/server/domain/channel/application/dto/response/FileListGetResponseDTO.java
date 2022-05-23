package com.tooliv.server.domain.channel.application.dto.response;

import com.tooliv.server.global.common.BaseEntity;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@ApiModel("FileListGetResponseDTO")
@Getter
public class FileListGetResponseDTO extends BaseResponseDTO {
    @ApiModelProperty("Aws S3 List 목록")
    private List<FileInfoDTO> fileInfoDTOList;

    public FileListGetResponseDTO() {
    }

    public FileListGetResponseDTO(List<FileInfoDTO> fileInfoDTOList) {
        this.fileInfoDTOList = fileInfoDTOList;
    }

    public static FileListGetResponseDTO of(String message, FileListGetResponseDTO fileListGetResponseDTO) {
        fileListGetResponseDTO.setMessage(message);

        return fileListGetResponseDTO;
    }
}
