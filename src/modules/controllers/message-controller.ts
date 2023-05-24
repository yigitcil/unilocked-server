import { Router } from "express";
import BaseController from "./base-controller";
import { MessageModel } from "../../resolved-models";
import { ObjectId } from "mongodb";

export class MessageController extends BaseController {
    listen(router: Router): void {
        router.post(
            "/addmsg",
            async (req, res, next) => {
                let errors: { id: number; msg: string }[] = [];
                try {
                    const from = req.user;
                    const { to, message } = req.body;
                    if (!from) {
                        errors.push({ id: 0, msg: "Please login first" });
                    }
                    if (!to) {
                        errors.push({ id: 1, msg: "Please select a receiver" });
                    }
                    if (!message) {
                        errors.push({ id: 2, msg: "Please enter a message" });
                    }
                    if (errors.length > 0) {
                        res.status(403).send({ errors: errors });
                    } else {
                        const data = await MessageModel.create({
                            text: message,
                            sender: from,
                            receiver: to
                        });

                        if (data) {
                            res.send({
                                success: true,
                                data: data
                            });
                        }
                        next();
                    }
                } catch (error) {
                    next(error);
                }
            });

        router.post(
            "/getallmsg",
            async (req, res, next) => {
                let errors: { id: number; msg: string }[] = [];
                try {
                    const from = req.user;
                    const to = req.body.to;
                    if (!from) {
                        errors.push({ id: 0, msg: "Please login first" });
                    }
                    if (!to) {
                        errors.push({ id: 1, msg: "Please select a receiver" });
                    }
                    if (errors.length > 0) {
                        res.status(403).send({ errors: errors });
                    } else {
                        const messages = await MessageModel.find({
                            $or: [
                                { sender: from, receiver: to },
                                { sender: to, receiver: from }
                            ]
                        }).sort({ updatedAt: 1 });
                        const allMessages = messages.map((msg) => {
                            return {
                                status: msg.sender.toString() === from._id.toString() ? "sender" : "receiver",
                                message: msg.text,
                            };
                        });
                        res.send({
                            success: true,
                            data: allMessages,
                        });
                        next();
                    }
                } catch (error) {
                    next(error);
                }
            });
    }
}