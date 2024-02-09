import { contactsSchemas } from "../schemas/index.js";
import { contactsServices } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";

const { updateContactSchema, createContactSchema, updateStatusSchema } =
  contactsSchemas;

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsServices.listContacts();
  contacts === null
    ? res.status(400).json({
        message: `No contacts here...`,
      })
    : res.status(200).json({
        message: `Successful getting contacts list. Length: ${contacts.length}`,
        contacts,
      });
});

export const getOneContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.getContactById(req.params.id);

  contact === null
    ? res.status(404).json({ msg: "Not found..." })
    : res.status(200).json({
        message: `Successful getting contact with id ${req.params.id}`,
        contact,
      });
});

export const deleteContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.removeContact(req.params.id);

  contact === null
    ? res.status(404).json({
        message: "Not found...",
      })
    : res.status(200).json({
        message: `Successful deleting contact with id ${req.params.id}`,
        contact,
      });
});

export const createContact = catchAsync(async (req, res) => {
  const validationResult = createContactSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }
  const contact = await contactsServices.addContact(req.body);

  contact === null
    ? res.status(400).json({
        message: `You tried to add an existing contact`,
      })
    : res.status(201).json({
        message: `Successfull adding a new contact: ${req.body.name}`,
        contact,
      });
});

export const updateContact = catchAsync(async (req, res) => {
  const updatedContactData = req.body;

  const validationResult = updateContactSchema.validate(updatedContactData);

  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }

  if (!req.body.name && !req.body.email && !req.body.phone) {
    res.status(400).json({ message: "Body must have at least one field" });
    return;
  }

  const updatedContact = await contactsServices.updateContactInfo(
    req.params.id,
    updatedContactData
  );

  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({
    message: `Successfull updating contact ${updatedContact.name}`,
    updatedContact,
  });
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const validationResult = updateStatusSchema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }

  const updatedContact = await contactsServices.updateContactStatus(
    req.params.id,
    req.body
  );

  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({
    message: `Successfull updating status contact ${updatedContact.name}`,
    updatedContact,
  });
});
