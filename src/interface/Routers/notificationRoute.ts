import { Router } from "express";
import { UserupdateStatus, createNotifications, findOnwerNotifications, findUserNotification, updateStatus } from "../Controllers/notificationController";

const notificationRouter = Router()

notificationRouter.post('/create',createNotifications)
notificationRouter.post('/ownerNotification',findOnwerNotifications)
notificationRouter.post('/updateStatus',updateStatus)
notificationRouter.post('/updateStatusByUser',UserupdateStatus)
notificationRouter.post('/userNotification',findUserNotification)
export default notificationRouter