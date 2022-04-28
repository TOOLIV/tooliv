package com.tooliv.server.domain.workspace.domain.repository;

import com.tooliv.server.domain.workspace.domain.Workspace;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, String> {

    Optional<Workspace> findByIdAndDeletedAt(String id, LocalDateTime deletedAt);

    boolean existsByNameAndDeletedAt(String name, LocalDateTime deletedAt);

    @Query(value="SELECT * "
        + "FROM workspace w "
        + "INNER JOIN workspace_members m ON m.workspace_id = w.id "
        + "WHERE w.deleted_at IS NULL AND m.user_id = :user_id "
        + "ORDER BY w.created_at ASC", nativeQuery = true)
    List<Workspace> findByUser(@Param("user_id") String userId);

}
