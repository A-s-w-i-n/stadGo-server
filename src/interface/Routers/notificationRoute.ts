import { Router } from "express";
import { createNotifications, findOnwerNotifications, findUserNotification, updateStatus } from "../Controllers/notificationController";

const notificationRouter = Router()

notificationRouter.post('/create',createNotifications)
notificationRouter.post('/ownerNotification',findOnwerNotifications)
notificationRouter.post('/updateStatus',updateStatus)
notificationRouter.post('/userNotification',findUserNotification)
export default notificationRouter