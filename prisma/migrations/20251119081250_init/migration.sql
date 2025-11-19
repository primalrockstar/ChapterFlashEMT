-- CreateTable
CREATE TABLE "chapters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "flashcards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'Basic',
    "certificationLevel" TEXT NOT NULL DEFAULT 'EMT',
    "type" TEXT NOT NULL DEFAULT 'definition',
    "tags" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "chapterNumber" INTEGER,
    "categoryId" INTEGER,
    CONSTRAINT "flashcards_chapterNumber_fkey" FOREIGN KEY ("chapterNumber") REFERENCES "chapters" ("number") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "flashcards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "mode" TEXT NOT NULL,
    "totalCards" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "completedAt" DATETIME,
    "chapterFilter" TEXT NOT NULL DEFAULT '[]',
    "categoryFilter" TEXT NOT NULL DEFAULT '[]',
    "difficultyFilter" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "study_session_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "flashcardId" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    "responseTime" INTEGER,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "answeredAt" DATETIME,
    CONSTRAINT "study_session_cards_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "study_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "study_session_cards_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "flashcards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flashcardId" TEXT NOT NULL,
    "totalSeen" INTEGER NOT NULL DEFAULT 0,
    "totalCorrect" INTEGER NOT NULL DEFAULT 0,
    "consecutiveCorrect" INTEGER NOT NULL DEFAULT 0,
    "lastSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReview" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "averageResponseTime" INTEGER,
    "difficultyRating" INTEGER NOT NULL DEFAULT 3,
    CONSTRAINT "user_progress_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "flashcards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyGoal" INTEGER NOT NULL DEFAULT 20,
    "reminderEnabled" BOOLEAN NOT NULL DEFAULT true,
    "reminderTime" TEXT NOT NULL DEFAULT '19:00',
    "autoPlayAudio" BOOLEAN NOT NULL DEFAULT false,
    "showDifficulty" BOOLEAN NOT NULL DEFAULT true,
    "showProgress" BOOLEAN NOT NULL DEFAULT true,
    "preferredStudyMode" TEXT NOT NULL DEFAULT 'review',
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "animationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newCardsPerDay" INTEGER NOT NULL DEFAULT 10,
    "maxReviewsPerDay" INTEGER NOT NULL DEFAULT 50,
    "graduatingInterval" INTEGER NOT NULL DEFAULT 4,
    "easyBonus" REAL NOT NULL DEFAULT 1.3,
    "hardFactor" REAL NOT NULL DEFAULT 1.2,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "app_statistics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalCards" INTEGER NOT NULL DEFAULT 0,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "totalStudyTime" INTEGER NOT NULL DEFAULT 0,
    "averageAccuracy" REAL NOT NULL DEFAULT 0.0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" DATETIME,
    "strongestChapter" INTEGER,
    "weakestChapter" INTEGER,
    "favoriteCategory" INTEGER,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "chapters_number_key" ON "chapters"("number");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "study_session_cards_sessionId_flashcardId_key" ON "study_session_cards"("sessionId", "flashcardId");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_flashcardId_key" ON "user_progress"("flashcardId");
