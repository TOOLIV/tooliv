package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel("ProfileInfoResponseDTO")
@Getter
@Builder
public class ProfileInfoResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 닉네임")
    private String nickname;

    @ApiModelProperty("회원 프로필 이미지")
    private String profileImage;

    @ApiModelProperty("상태 코드")
    private StatusCode statusCode;

    public static ProfileInfoResponseDTO of(String message, ProfileInfoResponseDTO profileInfoResponseDTO) {
        profileInfoResponseDTO.setMessage(message);

        return profileInfoResponseDTO;
    }

    public void updateProfileImage(String url) {
        this.profileImage = url;
    }
}
