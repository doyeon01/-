package com.ssafy.handam.feed.infrastructure.DataMigration;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DataMigrationRunner implements ApplicationRunner {

    private final DataMigrationService dataMigrationService;

    public DataMigrationRunner(DataMigrationService dataMigrationService) {
        this.dataMigrationService = dataMigrationService;
    }

//    @Override
    public void run(ApplicationArguments args) {
//        dataMigrationService.migrateData();
    }

    // 3분마다 데이터 마이그레이션 실행
//    @Scheduled(fixedRate = 180000)
//    public void scheduleDataMigration() {
//        dataMigrationService.migrateData();
//    }
}

