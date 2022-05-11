package com.tooliv.server.domain.user.application.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("StatusRequestDTO")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StatusRequestDTO {

    @NotNull
    @NotBlank
    @ApiModelProperty(name = "이메일 목록")
    private String[] emailList;

}
