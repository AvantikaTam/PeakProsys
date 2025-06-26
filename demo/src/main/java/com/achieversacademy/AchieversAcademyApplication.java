package com.achieversacademy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import java.io.File;

@SpringBootApplication
@EnableAsync
@EntityScan("com.achieversacademy.entity")
@EnableJpaRepositories("com.achieversacademy.repository")
public class AchieversAcademyApplication {
    public static void main(String[] args) {
        File uploadsDir = new File("uploads");
        if (!uploadsDir.exists()) {
            uploadsDir.mkdirs();
        }
        SpringApplication.run(AchieversAcademyApplication.class, args);
    }
}