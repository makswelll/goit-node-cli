const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removContact = contacts.find((item) => item.id === contactId);

  if (!removContact) {
    return null;
  }

  const updateContacts = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return removContact || null;
}

async function addContact(name, email, phone) {
  const newContact = { id: Date.now(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
