-- CreateTable
CREATE TABLE "User" (
    "userid" TEXT NOT NULL,
    "useremailid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "instructor" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseid")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lessonid" TEXT NOT NULL,
    "courseid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videourl" TEXT,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lessonid")
);

-- CreateTable
CREATE TABLE "LessonResource" (
    "resourceid" TEXT NOT NULL,
    "lessonid" TEXT NOT NULL,
    "resource_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonResource_pkey" PRIMARY KEY ("resourceid")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "enrollmentid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "courseid" TEXT NOT NULL,
    "enrolled_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress_pct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("enrollmentid")
);

-- CreateTable
CREATE TABLE "LessonCompletion" (
    "completionid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "lessonid" TEXT NOT NULL,
    "completed_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonCompletion_pkey" PRIMARY KEY ("completionid")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionid")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quizid" TEXT NOT NULL,
    "courseid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizid")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "quizid" TEXT NOT NULL,
    "questionid" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("quizid","questionid")
);

-- CreateTable
CREATE TABLE "QuizOption" (
    "optionid" TEXT NOT NULL,
    "questionid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizOption_pkey" PRIMARY KEY ("optionid")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "attemptid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "quizid" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "score" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("attemptid")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "answerid" TEXT NOT NULL,
    "attemptid" TEXT NOT NULL,
    "optionid" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("answerid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_useremailid_key" ON "User"("useremailid");

-- CreateIndex
CREATE INDEX "Lesson_courseid_idx" ON "Lesson"("courseid");

-- CreateIndex
CREATE INDEX "LessonResource_lessonid_idx" ON "LessonResource"("lessonid");

-- CreateIndex
CREATE INDEX "Enrollment_userid_idx" ON "Enrollment"("userid");

-- CreateIndex
CREATE INDEX "Enrollment_courseid_idx" ON "Enrollment"("courseid");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userid_courseid_key" ON "Enrollment"("userid", "courseid");

-- CreateIndex
CREATE INDEX "LessonCompletion_lessonid_idx" ON "LessonCompletion"("lessonid");

-- CreateIndex
CREATE UNIQUE INDEX "LessonCompletion_userid_lessonid_key" ON "LessonCompletion"("userid", "lessonid");

-- CreateIndex
CREATE INDEX "Quiz_courseid_idx" ON "Quiz"("courseid");

-- CreateIndex
CREATE INDEX "QuizQuestion_questionid_idx" ON "QuizQuestion"("questionid");

-- CreateIndex
CREATE INDEX "QuizOption_questionid_idx" ON "QuizOption"("questionid");

-- CreateIndex
CREATE INDEX "QuizAttempt_userid_idx" ON "QuizAttempt"("userid");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizid_idx" ON "QuizAttempt"("quizid");

-- CreateIndex
CREATE INDEX "QuizAnswer_attemptid_idx" ON "QuizAnswer"("attemptid");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructor_fkey" FOREIGN KEY ("instructor") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResource" ADD CONSTRAINT "LessonResource_lessonid_fkey" FOREIGN KEY ("lessonid") REFERENCES "Lesson"("lessonid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonCompletion" ADD CONSTRAINT "LessonCompletion_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonCompletion" ADD CONSTRAINT "LessonCompletion_lessonid_fkey" FOREIGN KEY ("lessonid") REFERENCES "Lesson"("lessonid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "Quiz"("quizid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("questionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOption" ADD CONSTRAINT "QuizOption_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("questionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "Quiz"("quizid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_attemptid_fkey" FOREIGN KEY ("attemptid") REFERENCES "QuizAttempt"("attemptid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_optionid_fkey" FOREIGN KEY ("optionid") REFERENCES "QuizOption"("optionid") ON DELETE RESTRICT ON UPDATE CASCADE;
