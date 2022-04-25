package com.tooliv.server.domain.workspace.domain.repository;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.workspace.domain.Workspace;
import com.tooliv.server.domain.workspace.domain.WorkspaceMembers;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMembers, String> {

    void deleteByUserAndWorkspace(User user, Workspace workspace);

    List<WorkspaceMembers> findByUser(User user);

    List<WorkspaceMembers> findByWorkspace(Workspace workspace);

}
