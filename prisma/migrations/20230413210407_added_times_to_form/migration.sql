/*
  Warnings:

  - Added the required column `end` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
