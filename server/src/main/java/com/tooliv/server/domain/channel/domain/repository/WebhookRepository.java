package com.tooliv.server.domain.channel.domain.repository;

import com.tooliv.server.domain.channel.domain.Webhook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebhookRepository extends JpaRepository<Webhook, String> {

}
