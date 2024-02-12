import { contactsServices } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";

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
  const contact = await contactsServices.addContact(req.body);

  res.status(201).json({
    message: `Successfull adding a new contact: ${req.body.name}`,
    contact,
  });
});

export const updateContact = catchAsync(async (req, res) => {
  const updatedContactData = req.body;

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
  const updatedContact = await contactsServices.updateContactStatus(
    req.params.id,
    req.body
  );

  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({
    message: `Successfull updating ${updatedContact.name} status`,
    updatedContact,
  });
});
