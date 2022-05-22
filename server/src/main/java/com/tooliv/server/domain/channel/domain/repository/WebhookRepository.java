package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Webhook;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebhookRepository extends JpaRepository<Webhook, String> {

    Optional<Webhook> findByIdAndDeletedAt(String id, LocalDateTime localDateTime);

}
