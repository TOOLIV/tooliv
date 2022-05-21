package com.tooliv.server.domain.channel.application.reservation;

import com.tooliv.server.domain.channel.application.dto.request.ReservationCreateRequestDTO;
import com.tooliv.server.domain.user.domain.User;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ReservationService {

    void createReservation(List<MultipartFile> multipartFiles, ReservationCreateRequestDTO reservationCreateRequestDTO);

    User getCurrentUser();
}
