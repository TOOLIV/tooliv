package com.tooliv.server.domain.channel.api;

import com.tooliv.server.domain.channel.application.chatService.ChatSearchService;
import com.tooliv.server.domain.channel.application.dto.response.ChatSearchInfoListResponseDTO;
import com.tooliv.server.global.common.BaseResponseDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "Search API", tags = {"Search"})
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final ChatSearchService chatSearchService;

    @GetMapping("/chat/content")
    @ApiOperation(value = "채팅 내용 검색")
    @ApiResponses({
        @ApiResponse(code = 200, message = "채팅 내용 검색 완료"),
        @ApiResponse(code = 409, message = "채팅 내용 검색 실패"),
    })
    public ResponseEntity<? extends BaseResponseDTO> getChannelNotificationList(@RequestParam String searchContent,@RequestParam String channelId) {
        ChatSearchInfoListResponseDTO chatSearchInfoListResponseDTO = null;

        try {
            chatSearchInfoListResponseDTO = chatSearchService.getChatList(searchContent,channelId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(BaseResponseDTO.of("채팅 내용 검색 실패"));
        }

        return ResponseEntity.status(200).body(ChatSearchInfoListResponseDTO.of("채팅 내용 검색 성공", chatSearchInfoListResponseDTO));
    }

}
