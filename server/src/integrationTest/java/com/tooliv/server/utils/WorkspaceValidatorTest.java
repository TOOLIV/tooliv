package com.tooliv.server.utils;

import static org.assertj.core.api.Assertions.assertThat;

import com.tooliv.server.domain.workspace.utils.WorkspaceValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class WorkspaceValidatorTest {

    private WorkspaceValidator underTest;

    @BeforeEach
    void setUp() {
        underTest = new WorkspaceValidator();
    }

    @Test
    void itShouldValidateWorkspaceName() {
        // Given
        String workspaceName = "+44개";

        // When
        boolean isValid = underTest.test(workspaceName);

        // Then
        assertThat(isValid).isFalse();
    }
}
