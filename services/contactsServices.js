import { Contact } from "../models/contactModel.js";
import { checkForRepeatEmail } from "../utils/checkForRepeatEmail.js";

export async function listContacts() {
  try {
    const data = await Contact.find();
    if (data.length === 0) return null;

    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function getContactById(contactId) {
  try {
    return await Contact.findById(contactId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addContact(newContact) {
  try {
    if (await checkForRepeatEmail(newContact.email)) return null;

    return await Contact.create({ ...newContact });
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateContactInfo(id, newContactData) {
  try {
    return await Contact.findByIdAndUpdate(id, newContactData, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateContactStatus(id, newContactStatus) {
  try {
    return await Contact.findByIdAndUpdate(id, newContactStatus, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}
