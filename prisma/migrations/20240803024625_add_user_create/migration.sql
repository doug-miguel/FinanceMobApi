/*
  Warnings:

  - Added the required column `createUser` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "createUser" INTEGER NOT NULL;
