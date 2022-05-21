package com.tooliv.server.domain.channel.application.reservation;

import com.tooliv.server.domain.channel.application.chatService.ChatService;
import com.tooliv.server.domain.channel.application.chatService.RedisPublisher;
import com.tooliv.server.domain.channel.application.dto.request.ChatRequestDTO;
import com.tooliv.server.domain.channel.domain.ChatFile;
import com.tooliv.server.domain.channel.domain.ChatMessage.Chat;
import com.tooliv.server.domain.channel.domain.Reservation;
import com.tooliv.server.domain.channel.domain.repository.ChatFileRepository;
import com.tooliv.server.domain.channel.domain.repository.ReservationRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BatchScheduler {

    private final ReservationRepository reservationRepository;

    private final ChatFileRepository chatFileRepository;

    private final ChatService chatService;

    private final RedisPublisher redisPublisher;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    // 10초마다 실행
    @Scheduled(cron = "0/60 * * * * *")
    public void testSchedule() {
        LocalDateTime now = LocalDateTime.now();

        logger.info("[SCHEDULE TEST] : {}", now);

        List<Reservation> reservations = reservationRepository.findBySendTimeBetween(now.minusSeconds(59), LocalDateTime.now().plusSeconds(59));

        if (reservations == null || reservations.isEmpty()) {
            logger.info("[Reservation] : {}", "No reservation now");
        } else {
            logger.info("[Reservation] : {}", "Sending reserved messages ...");

            for(Reservation reservation : reservations) {
                List<ChatFile> chatFileList = chatFileRepository.findByReservation(reservation);
                List<String> chatFileNameList = new ArrayList<>();
                List<String> chatFileUrlList = new ArrayList<>();

                for(ChatFile chatFile : chatFileList) {
                    chatFileNameList.add(chatFile.getFileName());
                    chatFileUrlList.add(chatFile.getFileUrl());
                }

                ChatRequestDTO chatRequestDTO = ChatRequestDTO.builder()
                    .channelId(reservation.getChannel().getId())
                    .contents(reservation.getContent())
                    .type("TALK")
                    .userId(reservation.getUser().getId())
                    .email(reservation.getUser().getEmail())
                    .sendTime(reservation.getSendTime())
                    .files(chatFileUrlList)
                    .originFiles(chatFileNameList).build();


                String channelId = reservation.getChannel().getId();

                chatService.setChatInfoValue(channelId, chatRequestDTO);

                redisPublisher.publish(chatService.getTopic(channelId), chatRequestDTO);
            }
        }
    }
}
