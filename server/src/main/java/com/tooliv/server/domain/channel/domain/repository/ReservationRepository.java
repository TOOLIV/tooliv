package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Reservation;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, String> {

   List<Reservation> findBySendTimeBetween(LocalDateTime before, LocalDateTime after);
}
