package com.tooliv.server.domain.channel.application.chatService;

import com.tooliv.server.domain.channel.application.ChannelMemberService;
import com.tooliv.server.domain.channel.application.dto.request.ChatDirectDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.application.dto.request.ChatUpdatedDTO;
import com.tooliv.server.domain.channel.application.dto.response.DirectRoomInfoResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.FileInfoDTO;
import com.tooliv.server.domain.channel.application.dto.response.FileListGetResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.FileUrlListResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.ChannelMembers;
import com.tooliv.server.domain.channel.domain.ChatFile;
import com.tooliv.server.domain.channel.domain.ChatMessage;
import com.tooliv.server.domain.channel.domain.ChatMessage.Chat;
import com.tooliv.server.domain.channel.domain.DirectChatRoom;
import com.tooliv.server.domain.channel.domain.DirectChatRoomMembers;
import com.tooliv.server.domain.channel.domain.Reservation;
import com.tooliv.server.domain.channel.domain.repository.ChannelMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.ChatFileRepository;
import com.tooliv.server.domain.channel.domain.repository.ChatMessageRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatRoomMembersRepository;
import com.tooliv.server.domain.channel.domain.repository.DirectChatRoomRepository;
import com.tooliv.server.domain.user.application.service.UserService;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listener
    private final RedisMessageListenerContainer redisMessageListener;
    // DM(topic)에 발행되는 메시지를 처리할 Listener
    private final RedisMessageListenerContainer redisDirectMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // 구독 처리 서비스
    private final RedisUserSubscriber redisUserSubscriber;
    // 메시지 서비스
    private final SimpMessageSendingOperations messagingTemplate;

    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    private final RedisTemplate<String, ChatRequestDTO> redisChannelTemplate;
    private final RedisTemplate<String, ChatDirectDTO> redisDirectTemplate;
    private HashOperations<String, String, Channel> opsHashChatRoom;
    private HashOperations<String, String, DirectChatRoom> opsHashDirectChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;
    private HashOperations<String, String, String> hashOpsEnterInfo;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisChannelTemplate.opsForHash();
        opsHashDirectChatRoom = redisDirectTemplate.opsForHash();
        hashOpsEnterInfo = redisChannelTemplate.opsForHash();

        topics = new HashMap<>();
    }

    private final ChatFileRepository chatFileRepository;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final DirectChatRoomRepository directChatRoomRepository;
    private final ChannelMembersRepository channelMembersRepository;
    private final DirectChatRoomMembersRepository directChatRoomMembersRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChannelMemberService channelMemberService;
    private final AwsS3Service awsS3Service;
    private final UserService userService;

    @Override
    public void createChatRoom(Channel channel) {
        String id = channel.getId();
        try {
            opsHashChatRoom.put(CHAT_ROOMS, id, channel);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    @Override
    public DirectRoomInfoResponseDTO createDirectChatRoom(String receiverEmail) {
        LocalDateTime now = LocalDateTime.now();
        User user1 = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        User user2 = userRepository.findByEmailAndDeletedAt(receiverEmail, null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        // 개인방이 존재하는경우
        if (directChatRoomRepository.findByUser1AndUser2(user1, user2).isPresent()) {
            return new DirectRoomInfoResponseDTO(directChatRoomRepository.findByUser1AndUser2(user1, user2).get().getId());
        } else if (directChatRoomRepository.findByUser1AndUser2(user2, user1).isPresent()) {
            return new DirectRoomInfoResponseDTO(directChatRoomRepository.findByUser1AndUser2(user2, user1).get().getId());
        }

        DirectChatRoom directChatRoom = DirectChatRoom.builder()
                .createdAt(now)
                .user1(user1)
                .user2(user2)
                .build();
        String id = directChatRoom.getId();

        directChatRoomRepository.save(directChatRoom);

        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);

        for (User user : userList) {
            DirectChatRoomMembers directChatRoomMembers = DirectChatRoomMembers.builder()
                    .createdAt(now)
                    .directChatRoom(directChatRoom)
                    .user(user)
                    .build();
            directChatRoomMembersRepository.save(directChatRoomMembers);
        }
        try {
            opsHashDirectChatRoom.put(CHAT_ROOMS, id, directChatRoom);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DirectRoomInfoResponseDTO(directChatRoom.getId());
    }

    @Override
    public void enterChatRoom(String channelId) {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new IllegalArgumentException("해당 채널이 존재하지 않습니다."));
        ChannelMembers channelMembers = channelMembersRepository.findByChannelAndUser(channel, user).orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다."));

        channelMembers.updateLoggedAt();
        channelMembersRepository.save(channelMembers);
        ChannelTopic topic = topics.get(channelId);
        if (topic == null) {
            topic = new ChannelTopic(channelId);
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(channelId, topic);
    }

    @Override
    public void enterDirectChatRoom(String channelId) {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
        DirectChatRoom directChatRoom = directChatRoomRepository.findById(channelId).orElseThrow(() -> new IllegalArgumentException("해당 Direct 채팅 방이 존재하지 않습니다."));
        DirectChatRoomMembers directChatRoomMembers = directChatRoomMembersRepository.findByDirectChatRoomAndUser(directChatRoom, user)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다."));

        directChatRoomMembers.updateLoggedAt();
        directChatRoomMembersRepository.save(directChatRoomMembers);
        ChannelTopic topic = topics.get(channelId);
        if (topic == null) {
            topic = new ChannelTopic(channelId);
        }
        redisDirectMessageListener.addMessageListener(redisUserSubscriber, topic);
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
            for (int i = 0; i < chatInfoList.size(); i++) {
                ChatRequestDTO chatRequestDTO = chatInfoList.get(i);
                if (chatRequestDTO.isDeleted()) {
                    chatRequestDTO.deletedData(i);
                    chatInfoList.set(i, chatRequestDTO);
                }
            }
            return chatInfoList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ChatDirectDTO> getChatDirectInfoValue(String key) {
        try {
            List<ChatDirectDTO> chatInfoList = redisDirectTemplate.opsForList().range(key, 0, -1);
            for (int i = 0; i < chatInfoList.size(); i++) {
                ChatDirectDTO chatDirectDTO = chatInfoList.get(i);
                if (chatDirectDTO.isDeleted()) {
                    chatDirectDTO.deletedData(i);
                    chatInfoList.set(i, chatDirectDTO);
                }
            }
            return chatInfoList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void setChatInfoValue(String key, ChatRequestDTO value) {
        Channel channel = channelRepository.findById(value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("해당 채널이 존재하지 않습니다."));
        channel.updateWroteAt();
        channelRepository.save(channel);
        long idx = redisChannelTemplate.opsForList().size(key);
        Chat chat = Chat.builder().chatId(idx).channelId(value.getChannelId()).build();
        ChatMessage chatMessage;

        if (value.getType().equals("TALK")) {
            User user = userRepository.findByEmailAndDeletedAt(value.getEmail(), null)
                    .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
            value.updateChatId(idx);
            redisChannelTemplate.opsForList().rightPush(key, value);
            chatMessage = ChatMessage.builder().chat(chat).content(value.getContents()).sendTime(value.getSendTime()).build();
            chatMessageRepository.save(chatMessage);
            for (int i = 0; i < value.getFiles().size(); i++) {
                ChatFile chatFile = ChatFile.builder()
                        .fileName(value.getOriginFiles().get(i))
                        .fileUrl(value.getFiles().get(i))
                        .user(user)
                        .channel(channel)
                        .createdAt(value.getSendTime())
                        .build();
                chatFileRepository.save(chatFile);
            }
        } else if (value.getType().equals("UPDATE")) {
            ChatRequestDTO chatRequestDTO = redisChannelTemplate.opsForList().index(key, value.getChatId());
            chatRequestDTO.updateIsUpdated();
            redisChannelTemplate.opsForList().set(key, value.getChatId(), chatRequestDTO);
            updateMessage(new ChatUpdatedDTO(value.getChatId(), value.getEmail(), value.getChannelId(), value.getType()));

            chatMessage = chatMessageRepository.findByChatChatIdAndChatChannelId(value.getChatId(), value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅이 존재하지 않습니다."));
            chatMessage.updateChat();
            chatMessageRepository.save(chatMessage);
        } else if (value.getType().equals("DELETE")) {
            ChatRequestDTO chatRequestDTO = redisChannelTemplate.opsForList().index(key, value.getChatId());
            chatRequestDTO.updateIsDeleted();
            redisChannelTemplate.opsForList().set(key, value.getChatId(), chatRequestDTO);
            updateMessage(new ChatUpdatedDTO(value.getChatId(), value.getEmail(), value.getChannelId(), value.getType()));

            chatMessage = chatMessageRepository.findByChatChatIdAndChatChannelId(value.getChatId(), value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅이 존재하지 않습니다."));
            chatMessage.deleteChat();
            chatMessageRepository.save(chatMessage);
        } else if (value.getType().equals("RESERVATION")) {
            value.updateChatId(idx);
            redisChannelTemplate.opsForList().rightPush(key, value);
            chatMessage = ChatMessage.builder().chat(chat).content(value.getContents()).sendTime(value.getSendTime()).build();
            chatMessageRepository.save(chatMessage);
        }

    }

    @Override
    public void setDirectChatInfoValue(String key, ChatDirectDTO value) {
        DirectChatRoom directChatRoom = directChatRoomRepository.findById(value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("해당 채널이 존재하지 않습니다."));
        directChatRoom.updateWroteAt();
        directChatRoomRepository.save(directChatRoom);
        long idx = redisDirectTemplate.opsForList().size(key);
        Chat chat = Chat.builder().chatId(idx).channelId(value.getChannelId()).build();
        ChatMessage chatMessage;

        if (value.getType().equals("TALK")) {
            User user = userRepository.findByEmailAndDeletedAt(value.getEmail(), null)
                    .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));
            value.updateChatId(idx);
            redisDirectTemplate.opsForList().rightPush(key, value);
            chatMessage = ChatMessage.builder().chat(chat).content(value.getContents()).sendTime(value.getSendTime()).build();
            chatMessageRepository.save(chatMessage);
            for (int i = 0; i < value.getFiles().size(); i++) {
                ChatFile chatFile = ChatFile.builder()
                        .fileName(value.getOriginFiles().get(i))
                        .fileUrl(value.getFiles().get(i))
                        .user(user)
                        .directChatRoom(directChatRoom)
                        .createdAt(value.getSendTime())
                        .build();
                chatFileRepository.save(chatFile);
            }
        } else if (value.getType().equals("UPDATE")) {
            ChatDirectDTO chatDirectDTO = redisDirectTemplate.opsForList().index(key, value.getChatId());
            chatDirectDTO.updateIsUpdated();
            redisDirectTemplate.opsForList().set(key, value.getChatId(), chatDirectDTO);
            updateDirectMessage(new ChatUpdatedDTO(value.getChatId(), value.getEmail(), value.getChannelId(), value.getType()));

            chatMessage = chatMessageRepository.findByChatChatIdAndChatChannelId(value.getChatId(), value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅이 존재하지 않습니다."));
            chatMessage.updateChat();
            chatMessageRepository.save(chatMessage);
        } else if (value.getType().equals("DELETE")) {
            ChatDirectDTO chatDirectDTO = redisDirectTemplate.opsForList().index(key, value.getChatId());
            chatDirectDTO.updateIsDeleted();
            redisDirectTemplate.opsForList().set(key, value.getChatId(), chatDirectDTO);
            updateDirectMessage(new ChatUpdatedDTO(value.getChatId(), value.getEmail(), value.getChannelId(), value.getType()));

            chatMessage = chatMessageRepository.findByChatChatIdAndChatChannelId(value.getChatId(), value.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅이 존재하지 않습니다."));
            chatMessage.deleteChat();
            chatMessageRepository.save(chatMessage);
        }
    }

    @Override
    public FileUrlListResponseDTO getFileURL(List<MultipartFile> multipartFiles) {
        List<String> files = new ArrayList<>();
        List<String> originFiles = new ArrayList<>();
        multipartFiles.forEach(file -> {
            String fileName = awsS3Service.uploadFile(file);
            files.add(awsS3Service.getFilePath(fileName));
            originFiles.add(file.getOriginalFilename());
        });
        return new FileUrlListResponseDTO(files, originFiles);
    }

    @Override
    public void getReservationFileURL(List<MultipartFile> multipartFiles, Reservation reservation) {
        List<String> files = new ArrayList<>();
        List<String> originFiles = new ArrayList<>();
        if(multipartFiles.size() <1)
            return;
        multipartFiles.forEach(file -> {
            String fileName = awsS3Service.uploadFile(file);
            String fileUrl = awsS3Service.getFilePath(fileName);
            ChatFile chatFile = ChatFile.builder().fileName(fileName).fileUrl(fileUrl).build();
            files.add(fileUrl);
            originFiles.add(file.getOriginalFilename());

            chatFile.updateReservation(reservation);
            chatFileRepository.save(chatFile);
        });
    }

    @Override
    public void updateMessage(ChatUpdatedDTO chatUpdatedDTO) {
        List<String> channelMemberEmails = channelMemberService.getChannelMemberEmails(chatUpdatedDTO.getChannelId());
        for (String email : channelMemberEmails) {
            messagingTemplate.convertAndSend("/sub/chat/" + userService.getUserId(email), chatUpdatedDTO);
        }
    }

    @Override
    public void updateDirectMessage(ChatUpdatedDTO chatUpdatedDTO) {
        User user1 = directChatRoomRepository.findById(chatUpdatedDTO.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅방 정보가 존재하지 않습니다.")).getUser1();
        User user2 = directChatRoomRepository.findById(chatUpdatedDTO.getChannelId()).orElseThrow(() -> new IllegalArgumentException("채팅방 정보가 존재하지 않습니다.")).getUser2();

        messagingTemplate.convertAndSend("/sub/chat/" + user1.getId(), chatUpdatedDTO);
        messagingTemplate.convertAndSend("/sub/chat/" + user2.getId(), chatUpdatedDTO);
    }

    @Override
    public FileListGetResponseDTO getFileInfoList(String channelId) {
        List<FileInfoDTO> fileInfoDTOList = new ArrayList<>();
        Channel channel = channelRepository.findById(channelId).orElse(null);
        if (channel == null) {
            DirectChatRoom directChatRoom = directChatRoomRepository.findById(channelId).orElseThrow(
                    () -> new IllegalArgumentException("다이렉트 방 정보가 없습니다."));
            List<ChatFile> chatFile = chatFileRepository.findByDirectChatRoom(directChatRoom);
            chatFile.forEach(file -> {
                fileInfoDTOList.add(new FileInfoDTO(directChatRoom.getId(), file.getUser().getNickname(), file.getFileName(), file.getFileUrl(), file.getCreatedAt()));
            });
        } else {
            List<ChatFile> chatFile = chatFileRepository.findByChannel(channel);
            chatFile.forEach(file -> {
                fileInfoDTOList.add(new FileInfoDTO(channel.getId(), file.getUser().getNickname(), file.getFileName(), file.getFileUrl(), file.getCreatedAt()));
            });
        }
        return new FileListGetResponseDTO(fileInfoDTOList);
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
