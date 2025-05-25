-- CreateTable
CREATE TABLE `KostOwner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `noTelp` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'REJECTED', 'APPROVED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `KostOwner_noTelp_key`(`noTelp`),
    UNIQUE INDEX `KostOwner_nik_key`(`nik`),
    UNIQUE INDEX `KostOwner_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
