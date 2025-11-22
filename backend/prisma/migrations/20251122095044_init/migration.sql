-- CreateTable
CREATE TABLE "Notification" (
    "sendingNotificationId" INTEGER NOT NULL,
    "recievingNotificationId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followRequest" BOOLEAN,
    "inviteToPod" BOOLEAN,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("sendingNotificationId","recievingNotificationId")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sendingNotificationId_fkey" FOREIGN KEY ("sendingNotificationId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recievingNotificationId_fkey" FOREIGN KEY ("recievingNotificationId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
