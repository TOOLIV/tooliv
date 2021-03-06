package com.tooliv.server.domain.channel.application.reservationService;

import com.tooliv.server.domain.channel.application.chatService.ChatService;
import com.tooliv.server.domain.channel.application.dto.request.ReservationCreateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ReservationListResponseDTO;
import com.tooliv.server.domain.channel.application.dto.response.ReservationResponseDTO;
import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.Reservation;
import com.tooliv.server.domain.channel.domain.repository.ChannelRepository;
import com.tooliv.server.domain.channel.domain.repository.ReservationRepository;
import com.tooliv.server.domain.channel.execption.ChannelNotFoundException;
import com.tooliv.server.domain.channel.execption.WebhookNotFoundException;
import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import com.tooliv.server.global.exception.UserNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;

    private final UserRepository userRepository;

    private final ChannelRepository channelRepository;

    private final ChatService chatService;

    @Override
    public void createReservation(List<MultipartFile> multipartFiles, ReservationCreateRequestDTO reservationCreateRequestDTO) {
        User user = getCurrentUser();

        Channel channel = channelRepository.findByIdAndDeletedAt(reservationCreateRequestDTO.getChannelId(), null)
            .orElseThrow(() -> new ChannelNotFoundException("해당 채널을 찾을 수 없음"));

        Reservation reservation = Reservation.builder()
            .user(user)
            .createdAt(LocalDateTime.now())
            .channel(channel)
            .content(reservationCreateRequestDTO.getContent())
            .sendTime(reservationCreateRequestDTO.getSendTime()).build();

        reservationRepository.save(reservation);

        chatService.getReservationFileURL(multipartFiles, reservation);
    }

    @Override
    public ReservationListResponseDTO getReservationList(String channelId) {
        User currentUser = getCurrentUser();

        Channel channel = channelRepository.findByIdAndDeletedAt(channelId, null)
            .orElseThrow(() -> new ChannelNotFoundException("채널 정보를 찾을 수 없음"));

        List<Reservation> reservationList = reservationRepository.findByChannelAndUserAndDeletedAt(channel, currentUser, null);

        List<ReservationResponseDTO> reservationResponseDTOList = new ArrayList<>();

        for(Reservation reservation : reservationList) {
            reservationResponseDTOList.add(
                ReservationResponseDTO.builder()
                    .userId(reservation.getUser().getId())
                    .sendTime(reservation.getSendTime())
                    .reservationId(reservation.getId())
                    .content(reservation.getContent())
                    .created_at(reservation.getCreatedAt()).build()
            );
        }

        return new ReservationListResponseDTO(reservationResponseDTOList);
    }

    @Override
    public void deleteReservation(String reservationId) {
        User currentUser = getCurrentUser();

        Reservation reservation = reservationRepository.findByIdAndDeletedAt(reservationId, null)
            .orElseThrow(() -> new WebhookNotFoundException("웹훅 정보를 찾을 수 없음"));

        User user = reservation.getUser();

        if(currentUser.getEmail().equals(user.getEmail())) {
            reservation.deleteReservation(LocalDateTime.now());

            reservationRepository.save(reservation);
        }
    }

    @Override
    public User getCurrentUser() {
        User user = userRepository.findByEmailAndDeletedAt(SecurityContextHolder.getContext().getAuthentication().getName(), null)
            .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없음"));

        return user;
    }
}
