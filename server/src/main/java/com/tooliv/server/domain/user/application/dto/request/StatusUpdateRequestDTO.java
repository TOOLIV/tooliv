package com.tooliv.server.domain.user.application.dto.request;

import com.tooliv.server.domain.user.domain.enums.StatusCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("StatusUpdateRequestDTO")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StatusUpdateRequestDTO {

    @NotBlank
    @NotNull
    @ApiModelProperty(name = "상태 코드")
    private StatusCode statusCode;
}
