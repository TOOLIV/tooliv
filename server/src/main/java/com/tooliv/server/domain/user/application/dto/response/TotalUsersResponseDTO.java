package com.tooliv.server.domain.user.application.dto.response;

import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("TotalUsersResponseDTO")
@NoArgsConstructor
@Getter
public class TotalUsersResponseDTO extends BaseResponseDTO {

    @ApiModelProperty("회원 수")
    private int totalUsers;

    public TotalUsersResponseDTO(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public static TotalUsersResponseDTO of(String message, TotalUsersResponseDTO totalUsersResponseDTO) {
        totalUsersResponseDTO.setMessage(message);

        return totalUsersResponseDTO;
    }

}
