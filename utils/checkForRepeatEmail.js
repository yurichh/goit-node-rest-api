import { Contact } from "../models/contactModel.js";

export const checkForRepeatEmail = async (email) => {
  const contactList = await Contact.find();
  return contactList.filter((contact) => contact.email === email).length > 0;
};
