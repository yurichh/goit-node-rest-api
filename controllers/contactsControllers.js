import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactInfo,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json({
    message: `Successful getting contacts list. Length: ${contacts.length}`,
    contacts,
  });
};

export const getOneContact = async (req, res) => {
  const contact = await getContactById(req.params.id);

  contact === null
    ? res.status(404).json({ msg: "Not found..." })
    : res.status(200).json({
        message: `Successful getting contact with id ${req.params.id}`,
        contact,
      });
};

export const deleteContact = async (req, res) => {
  const contact = await removeContact(req.params.id);

  contact === null
    ? res.status(404).json({
        message: "Not found...",
      })
    : res.status(200).json({
        message: `Successful deleting contact with id ${req.params.id}`,
        contact,
      });
};

export const createContact = async (req, res) => {
  const newContact = req.body;

  const validationResult = createContactSchema.validate(newContact);
  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.message,
    });
    return;
  }

  const { name, email, phone } = newContact;
  const contact = await addContact(name, email, phone);

  res.status(201).json({
    message: "Successfull adding a new contact",
    contact,
  });
};

export const updateContact = async (req, res) => {
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

  const updatedContact = await updateContactInfo(req.params.id, req.body);

  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({
    message: `Successfull updating contact ${updatedContact.name}`,
    updatedContact,
  });
};
