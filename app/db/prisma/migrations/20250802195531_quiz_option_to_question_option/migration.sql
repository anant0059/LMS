/*
  Warnings:

  - You are about to drop the `QuizOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizAnswer" DROP CONSTRAINT "QuizAnswer_optionid_fkey";

-- DropForeignKey
ALTER TABLE "QuizOption" DROP CONSTRAINT "QuizOption_questionid_fkey";

-- DropTable
DROP TABLE "QuizOption";

-- CreateTable
CREATE TABLE "QuestionOption" (
    "optionid" TEXT NOT NULL,
    "questionid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("optionid")
);

-- CreateIndex
CREATE INDEX "QuestionOption_questionid_idx" ON "QuestionOption"("questionid");

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("questionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_optionid_fkey" FOREIGN KEY ("optionid") REFERENCES "QuestionOption"("optionid") ON DELETE RESTRICT ON UPDATE CASCADE;
