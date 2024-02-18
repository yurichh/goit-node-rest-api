import { contactsServices } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";
import { HttpError } from "../utils/httpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsServices.listContacts(req.user);
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
  const contact = await contactsServices.getContactById(
    req.params.id,
    req.user
  );

  contact === null
    ? res.status(404).json({
        msg: "Contact not found or you don`t have access to this contact list...",
      })
    : res.status(200).json({
        message: `Successful getting contact with id ${req.params.id}`,
        contact: contact[0],
      });
});

export const deleteContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.removeContact(req.params.id, req.user);

  contact === null
    ? res.status(404).json({
        message:
          "Contact not found or you don`t have access to this contact list...",
      })
    : res.status(200).json({
        message: `Successful deleting contact with id ${req.params.id}`,
        contact,
      });
});

export const createContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.addContact(req.body, req.user);

  if (contact) {
    res.status(201).json({
      message: `Successfull adding a new contact: ${req.body.name}`,
      contact,
    });
  } else {
    throw new HttpError(400, "Ooops, something go wrong..");
  }
});

export const updateContact = catchAsync(async (req, res) => {
  const dataToChange = req.body;

  const updatedContact = await contactsServices.updateContactInfo(
    req.params.id,
    dataToChange,
    req.user
  );

  if (updatedContact === null) {
    res.status(404).json({
      message:
        "Contact not found or you don`t have access to this contact list...",
    });
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
    req.body,
    req.user
  );

  if (updatedContact === null) {
    res.status(404).json({
      message:
        "Contact not found or you don`t have access to this contact list...",
    });
    return;
  }

  res.status(200).json({
    message: `Successfull updating ${updatedContact.name} status`,
    updatedContact,
  });
});
