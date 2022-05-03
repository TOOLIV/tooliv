package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.FileUrlListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChatFile;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.repository.ChatFileRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatRoomRepository;
import com.tooliv.server.global.common.AwsS3Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;

    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    private final RedisTemplate<String, ChatRequestDTO> redisChannelTemplate;
    private HashOperations<String, String, Channel> opsHashChatRoom;
    private HashOperations<String, String, DirectChatRoom> opsHashDirectChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;
    private HashOperations<String, String, String> hashOpsEnterInfo;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisChannelTemplate.opsForHash();
        opsHashDirectChatRoom = redisChannelTemplate.opsForHash();
        hashOpsEnterInfo = redisChannelTemplate.opsForHash();

        topics = new HashMap<>();
    }

    private final ChatFileRepository chatFileRepository;
    private final DirectChatRoomRepository directChatRoomRepository;
    private final AwsS3Service awsS3Service;

    @Override
    public void createChatRoom(Channel channel) {
        String id = channel.getId();
        try {
            opsHashChatRoom.put(CHAT_ROOMS, id, channel);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void createDirectChatRoom(String receiverName) {
        LocalDateTime now = LocalDateTime.now();

        DirectChatRoom directChatRoom = DirectChatRoom.builder().name(receiverName)
            .createdAt(now)
            .build();
        String id = directChatRoom.getId();

        directChatRoomRepository.save(directChatRoom);

        try {
            opsHashDirectChatRoom.put(CHAT_ROOMS, id, directChatRoom);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void enterChatRoom(String channelId) {
        ChannelTopic topic = topics.get(channelId);
        if (topic == null) {
            topic = new ChannelTopic(channelId);
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(channelId, topic);
    }

    @Override
    public ChannelTopic getTopic(String channelId) {
        return topics.get(channelId);
    }

    @Override
    public List<ChatRequestDTO> getChatInfoValue(String key) {
        try {
            List<ChatRequestDTO> chatInfoList = redisChannelTemplate.opsForList().range(key, 0, -1);
            return chatInfoList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void setChatInfoValue(String key, ChatRequestDTO value) {
        System.out.println(redisChannelTemplate.opsForList().rightPush(key, value));
    }

    @Override
    public FileUrlListResponseDTO getFileURL(List<MultipartFile> multipartFiles) {
        List<String> files = new ArrayList<>();
        List<String> originFiles = new ArrayList<>();
        multipartFiles.forEach(file -> {
            String fileName = awsS3Service.uploadFile(file);
            ChatFile chatFile = ChatFile.builder()
                .fileName(fileName)
                .build();
            files.add(getImageURL(fileName));
            originFiles.add(fileName);
            chatFileRepository.save(chatFile);
        });

        return new FileUrlListResponseDTO(files,originFiles);
    }

    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }

    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }

    private String getImageURL(String fileName) {
        return "https://tooliva402.s3.ap-northeast-2.amazonaws.com/" + fileName;
    }
}
