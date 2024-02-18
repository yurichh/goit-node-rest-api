import { Contact } from "../models/contactModel.js";

export async function listContacts(owner) {
  try {
    const data = await Contact.find({ owner });
    if (data.length === 0) return null;

    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function getContactById(contactId, owner) {
  try {
    const contact = await Contact.find({ _id: contactId, owner });

    if (contact.length === 0) return null;
    return contact;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function removeContact(contactId, owner) {
  try {
    const contactToDelete = await Contact.find({ _id: contactId, owner });

    if (contactToDelete.length === 0) return null;

    return await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addContact(newContact, owner) {
  try {
    return await Contact.create({ ...newContact, owner });
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateContactInfo(id, newContactData, owner) {
  try {
    const contact = await Contact.find({ _id: id, owner });

    if (contact.length === 0) return null;

    return await Contact.findByIdAndUpdate(id, newContactData, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateContactStatus(id, newContactStatus, owner) {
  try {
    const contact = await Contact.find({ _id: id, owner });

    if (contact.length === 0) return null;

    return await Contact.findByIdAndUpdate(id, newContactStatus, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}
