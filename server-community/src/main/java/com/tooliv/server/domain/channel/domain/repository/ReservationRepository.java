package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.Reservation;
import com.tooliv.server.domain.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, String> {

   Optional<Reservation> findByIdAndDeletedAt(String reservationId, LocalDateTime localDateTime);

   List<Reservation> findBySendTimeBetween(LocalDateTime before, LocalDateTime after);

   List<Reservation> findByChannelAndUserAndDeletedAt(Channel channel, User user, LocalDateTime localDateTime);
}
