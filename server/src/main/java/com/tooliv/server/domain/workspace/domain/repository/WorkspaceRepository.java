package com.tooliv.server.domain.workspace.domain.repository;

import com.tooliv.server.domain.workspace.domain.Workspace;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, String> {

    Optional<Workspace> findByIdAndDeletedAt(String id, LocalDateTime deletedAt);

    boolean existsByNameAndDeletedAt(String name, LocalDateTime deletedAt);

}
