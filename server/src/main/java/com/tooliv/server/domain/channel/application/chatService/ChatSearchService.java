package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.dto.response.ChatSearchInfoListResponseDTO;

public interface ChatSearchService {
    ChatSearchInfoListResponseDTO getChatList(String searchContent,String channelId);
}
