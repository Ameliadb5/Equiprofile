-- Migration 0015: Student system tables (Phase 2)
-- Adds virtual horses, student horse assignments, student tasks, training entries,
-- progress tracking, study topics, and AI tutor session logging.

-- Virtual horses for student learning
CREATE TABLE IF NOT EXISTS `virtualHorses` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `breed` varchar(100),
  `color` varchar(50),
  `age` int,
  `personality` varchar(100),
  `feedingScore` int NOT NULL DEFAULT 80,
  `groomingScore` int NOT NULL DEFAULT 80,
  `exerciseScore` int NOT NULL DEFAULT 80,
  `healthScore` int NOT NULL DEFAULT 80,
  `overallScore` int NOT NULL DEFAULT 80,
  `photoUrl` text,
  `isActive` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_virtualHorses_userId` (`userId`)
);--> statement-breakpoint

-- Student horse assignments (links student to a real horse)
CREATE TABLE IF NOT EXISTS `studentHorseAssignments` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `studentUserId` int NOT NULL,
  `horseId` int NOT NULL,
  `assignedBy` int,
  `stableId` int,
  `notes` text,
  `isActive` boolean NOT NULL DEFAULT true,
  `assignedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_sha_studentUserId` (`studentUserId`),
  INDEX `idx_sha_horseId` (`horseId`)
);--> statement-breakpoint

-- Student tasks (daily/weekly care and learning tasks)
CREATE TABLE IF NOT EXISTS `studentTasks` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `category` varchar(50) NOT NULL DEFAULT 'care',
  `frequency` varchar(20) NOT NULL DEFAULT 'daily',
  `targetDate` date,
  `isCompleted` boolean NOT NULL DEFAULT false,
  `completedAt` timestamp NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_studentTasks_userId` (`userId`)
);--> statement-breakpoint

-- Student training entries (simplified training log)
CREATE TABLE IF NOT EXISTS `studentTrainingEntries` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `sessionDate` date NOT NULL,
  `duration` int,
  `sessionType` varchar(50) NOT NULL DEFAULT 'lesson',
  `notes` text,
  `wentWell` text,
  `needsImprovement` text,
  `instructor` varchar(100),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_ste_userId` (`userId`)
);--> statement-breakpoint

-- Student progress (skill tracking)
CREATE TABLE IF NOT EXISTS `studentProgress` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `skillArea` varchar(100) NOT NULL,
  `level` int NOT NULL DEFAULT 1,
  `xp` int NOT NULL DEFAULT 0,
  `lastActivityAt` timestamp NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sp_userId` (`userId`)
);--> statement-breakpoint

-- Study topics (structured learning content)
CREATE TABLE IF NOT EXISTS `studyTopics` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `slug` varchar(80) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `category` varchar(80) NOT NULL,
  `difficulty` varchar(20) NOT NULL DEFAULT 'beginner',
  `contentMd` text,
  `sortOrder` int NOT NULL DEFAULT 0,
  `isPublished` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_studyTopics_category` (`category`)
);--> statement-breakpoint

-- AI tutor sessions (usage logging and cost tracking)
CREATE TABLE IF NOT EXISTS `aiTutorSessions` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `question` text NOT NULL,
  `answer` text,
  `modelUsed` varchar(100),
  `tier` varchar(20) NOT NULL DEFAULT 'standard',
  `promptTokens` int NOT NULL DEFAULT 0,
  `completionTokens` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_ats_userId` (`userId`)
);
