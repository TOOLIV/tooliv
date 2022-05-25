package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Channel;
import com.tooliv.server.domain.channel.domain.Webhook;
import com.tooliv.server.domain.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebhookRepository extends JpaRepository<Webhook, String> {

    Optional<Webhook> findByIdAndDeletedAt(String id, LocalDateTime localDateTime);

    List<Webhook> findByChannelAndUserAndDeletedAt(Channel channel, User user, LocalDateTime localDateTime);

}
