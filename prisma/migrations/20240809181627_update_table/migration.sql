/*
  Warnings:

  - You are about to drop the column `createUser` on the `groups` table. All the data in the column will be lost.
  - Added the required column `create_user` to the `users_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" DROP COLUMN "createUser";

-- AlterTable
ALTER TABLE "users_groups" ADD COLUMN     "create_user" INTEGER NOT NULL;
