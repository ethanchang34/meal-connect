/*
  Warnings:

  - Added the required column `give` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "give" BOOLEAN NOT NULL;
