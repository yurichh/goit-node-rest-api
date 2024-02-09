import express from "express";
import { contactsControllers } from "../controllers/index.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post("/", contactsControllers.createContact);

contactsRouter.put("/:id", contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", contactsControllers.updateStatusContact);
