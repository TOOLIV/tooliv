package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.FileUrlListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import java.util.List;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.web.multipart.MultipartFile;

public interface ChatService {

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    void createChatRoom(Channel channel);

    void createDirectChatRoom(String receiverEmail);

    void enterUser();

    // 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    void enterChatRoom(String channelId);

    // 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    void enterDirectChatRoom(String channelId);

    ChannelTopic getTopic(String channelId);

    List<ChatRequestDTO> getChatInfoValue(String key);

    void setChatInfoValue(String key, ChatRequestDTO value);

    void setDirectChatInfoValue(String key, ChatDirectDTO value);

    FileUrlListResponseDTO getFileURL(List<MultipartFile> multipartFiles);

}
