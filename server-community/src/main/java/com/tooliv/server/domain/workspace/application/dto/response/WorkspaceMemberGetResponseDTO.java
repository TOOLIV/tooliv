package com.tooliv.server.domain.workspace.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.domain.workspace.domain.enums.WorkspaceMemberCode;
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
@ApiModel("WorkspaceMemberGetResponseDTO")
public class WorkspaceMemberGetResponseDTO {

    @ApiModelProperty("user 이메일")
    private String email;

    @ApiModelProperty("user 이름")
    private String name;

    @ApiModelProperty("user 상태코드")
    private StatusCode statusCode;

    @ApiModelProperty("user 닉네임")
    private String nickname;

    @ApiModelProperty("워크스페이스멤버 코드")
    private WorkspaceMemberCode workspaceMemberCode;

    @ApiModelProperty("프로필 이미지")
    private String profileImage;

}
