import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const contactToFind = contactList.filter(
      (contact) => contact.id === contactId
    );
    if (contactToFind.length === 0) return null;
    return contactToFind;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function removeContact(contactId) {
  try {
    const contactList = await listContacts();

    const newContactList = contactList.filter(
      (contact) => contact.id !== contactId
    );

    const contactToRemove = contactList.filter(
      (contact) => contact.id === contactId
    );

    if (newContactList.length === 0 || contactToRemove.length === 0)
      return null;

    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    return contactToRemove;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contactList = await listContacts();

    const contactToAdd = {
      id: v4(),
      name,
      email,
      phone,
    };

    contactList.push(contactToAdd);

    fs.writeFile(contactsPath, JSON.stringify(contactList));
    return contactToAdd;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateContactInfo(id, newContactData) {
  try {
    const contactList = await listContacts();
    const contactToUpdate = contactList.filter((contact) => contact.id === id);

    if (contactToUpdate.length === 0) return null;
    const updatedContact = { ...contactToUpdate[0], ...newContactData };

    await removeContact(id);

    const { name, email, phone } = updatedContact;
    return addContact(name, email, phone);
  } catch (err) {
    console.log(err);
    return;
  }
}
