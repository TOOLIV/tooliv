package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.dto.response.ChatSearchInfoDTO;
import com.tooliv.server.domain.channel.application.dto.response.ChatSearchInfoListResponseDTO;
import com.tooliv.server.domain.channel.domain.ChatMessage;
import com.tooliv.server.domain.channel.domain.repository.ChatMessageRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatSearchServiceImpl implements ChatSearchService {

    private final ChatMessageRepository chatMessageRepository;

    @Override
    public ChatSearchInfoListResponseDTO getChatList(String searchContent,String channelId) {
        // 검색 결과가 없는 경우 null
        List<ChatMessage> chatMessageList = chatMessageRepository.findByContents(searchContent,channelId).orElse(new ArrayList<>());
        List<ChatSearchInfoDTO> chatSearchInfoDTOList = new ArrayList<>();
        for (ChatMessage chatMessage : chatMessageList) {
            chatSearchInfoDTOList.add(new ChatSearchInfoDTO(chatMessage.getChat().getChatId(),chatMessage.getChat().getChannelId(),chatMessage.getContent()));
        }
        return new ChatSearchInfoListResponseDTO(chatSearchInfoDTOList);
    }
}
