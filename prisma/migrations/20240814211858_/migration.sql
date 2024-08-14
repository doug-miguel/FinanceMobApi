-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,
    "invited_by" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_fkey" FOREIGN KEY ("invited_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
