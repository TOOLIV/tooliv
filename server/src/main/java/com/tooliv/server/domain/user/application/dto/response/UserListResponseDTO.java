package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
@ApiModel("UserListResponseDTO")
public class UserListResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 정보 목록")
    private List<UserInfoResponseDTO> userInfoResponseDTOList;

    @ApiModelProperty("회원 수")
    private int numberOfUser;

    public UserListResponseDTO() {

    }

    public UserListResponseDTO(List<UserInfoResponseDTO> userInfoResponseDTOList, int numberOfUser) {
        this.userInfoResponseDTOList = userInfoResponseDTOList;
        this.numberOfUser = numberOfUser;
    }

    public static UserListResponseDTO of(String message, UserListResponseDTO userListResponseDTO) {
        userListResponseDTO.setMessage(message);

        return userListResponseDTO;
    }
}
