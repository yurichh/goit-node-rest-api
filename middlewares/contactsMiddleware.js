import { Contact } from "../models/contactModel.js";
import { contactsSchemas } from "../schemas/index.js";
import { catchAsync } from "../utils/index.js";

export const validateCreatedContact = catchAsync(async (req, res, next) => {
  const validationResult = contactsSchemas.createContactSchema.validate(
    req.body
  );

  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }

  const contactList = await Contact.find({ owner: req.user });

  if (
    contactList.filter((contact) => contact.email === req.body.email).length > 0
  ) {
    res.status(409).json({ msg: `User with email **${email}** already exist` });
    return;
  }

  next();
});

export const validateUpdatedContact = catchAsync(async (req, res, next) => {
  const updatedContactData = req.body;

  const validationResult =
    contactsSchemas.updateContactSchema.validate(updatedContactData);

  if (validationResult.error)
    res.status(400).json({ message: validationResult.error.message });

  if (!req.body.name && !req.body.email && !req.body.phone)
    res.status(400).json({ message: "Body must have at least one field" });

  next();
});

export const validateUpdatedStatus = catchAsync(async (req, res, next) => {
  const validationResult = contactsSchemas.updateStatusSchema.validate(
    req.body
  );

  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }

  next();
});
