package com.tooliv.server.domain.channel.application.reservationService;

import com.tooliv.server.domain.channel.application.dto.request.ReservationCreateRequestDTO;
import com.tooliv.server.domain.channel.application.dto.response.ReservationListResponseDTO;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ReservationService {

    void createReservation(List<MultipartFile> multipartFiles, ReservationCreateRequestDTO reservationCreateRequestDTO);

    ReservationListResponseDTO getReservationList(String channelId);

    void deleteReservation(String reservationId);

    User getCurrentUser();
}
