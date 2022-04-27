package com.tooliv.server.domain.workspace.application.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ApiModel("WorkspaceGetResponseDTO")
public class WorkspaceGetResponseDTO {

    @ApiModelProperty("워크스페이스 ID")
    private String id;

    @ApiModelProperty("워크스페이스 이름")
    private String name;

    @ApiModelProperty("워크스페이스 썸네일")
    private String thumbnailImage;

}
