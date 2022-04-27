package com.tooliv.server.domain.chat.application;

import com.tooliv.server.domain.chat.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.chat.application.dto.request.ChatRoomUserInfoRequestDTO;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomInfoDTO;
import com.tooliv.server.domain.chat.application.dto.response.ChatRoomListResponseDTO;
import com.tooliv.server.domain.chat.domain.ChatFile;
import com.tooliv.server.domain.chat.domain.ChatMessage;
import com.tooliv.server.domain.chat.domain.ChatRoom;
import com.tooliv.server.domain.chat.domain.repository.ChatFileRepository;
import com.tooliv.server.domain.chat.domain.repository.ChatMessageRepository;
import com.tooliv.server.domain.chat.domain.repository.ChatRoomRepository;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.common.AwsS3Service;
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
    private final RedisTemplate<String, ChatRequestDTO> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;
    private HashOperations<String, String, String> hashOpsEnterInfo;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        hashOpsEnterInfo = redisTemplate.opsForHash();

        topics = new HashMap<>();
    }

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ChatFileRepository chatFileRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final AwsS3Service awsS3Service;

    @Override
    public ChatRoomListResponseDTO getChatRoomList(String email) {
        List<ChatRoomInfoDTO> chatRoomListResponseDTO = new ArrayList<>();
        User user = userRepository.findByEmailAndDeletedAt(email, null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        for (ChatRoom chatRoom : chatRoomRepository.findChatRoomsByCustomer(user).orElseThrow(() -> new IllegalArgumentException("조회 가능한 채팅방이 없습니다."))) {
            chatRoomListResponseDTO.add(new ChatRoomInfoDTO(chatRoom.getId(), chatRoom.getName()));
        }

        return new ChatRoomListResponseDTO(chatRoomListResponseDTO);
    }

    @Override
    public ChatRoom createChatRoom(ChatRoomUserInfoRequestDTO chatRoomUserInfoRequestDTO) {
        User customer = userRepository.findByEmailAndDeletedAt(chatRoomUserInfoRequestDTO.getEmail(), null)
            .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        String nickname = customer.getNickname();
        ChatRoom chatRoom = ChatRoom.builder().name(nickname).customer(customer).build();
        String id = chatRoomRepository.save(chatRoom).getId();
        try {
            opsHashChatRoom.put(CHAT_ROOMS, id, chatRoom);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return chatRoom;
    }

    @Override
    public void enterChatRoom(String roomId) {
        ChannelTopic topic = topics.get(roomId);
        if (topic == null) {
            topic = new ChannelTopic(roomId);
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomId, topic);
    }

    @Override
    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }

    @Override
    public List<ChatRequestDTO> getChatInfoValue(String key) {
        try {
            List<ChatRequestDTO> chatInfoList = redisTemplate.opsForList().range(key, 0, -1);
            return chatInfoList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void setChatInfoValue(String key, ChatRequestDTO value, List<MultipartFile> multipartFiles) {
        //Todo
        value.updateFiles(getFileURL(multipartFiles));
        System.out.println(redisTemplate.opsForList().rightPush(key, value));
    }

    @Override
    public List<String> getFileURL(List<MultipartFile> multipartFiles) {
        List<String> files = new ArrayList<>();
        multipartFiles.forEach(file -> {
            String fileName = awsS3Service.uploadFile(file);
            ChatFile chatFile = ChatFile.builder()
                .fileName(fileName)
                .build();
            files.add(fileName);
            chatFileRepository.save(chatFile);
        });
        return files;
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
}
