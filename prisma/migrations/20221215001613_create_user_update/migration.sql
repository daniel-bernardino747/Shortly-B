/*
  Warnings:

  - Added the required column `confirm_password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirm_password" TEXT NOT NULL;
