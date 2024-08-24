/*
  Warnings:

  - You are about to drop the column `email` on the `invitations` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invitations" DROP COLUMN "email",
ADD COLUMN     "id_user" INTEGER NOT NULL;
