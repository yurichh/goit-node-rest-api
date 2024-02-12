import express from "express";
import { contactsControllers } from "../controllers/index.js";
import { authMiddleware, contactsMiddleware } from "../middlewares/index.js";

export const contactsRouter = express.Router();
contactsRouter.use(authMiddleware.protect);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  contactsMiddleware.validateCreatedContact,
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  contactsMiddleware.validateUpdatedContact,
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  contactsMiddleware.validateUpdatedStatus,
  contactsControllers.updateStatusContact
);
