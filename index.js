const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;
    case "get":
      const foundContact = await getContactById();
      return console.table(foundContact);
      break;
    case "add":
      const adContact = await addContact(name, email, phone);
      console.table(adContact);
      break;
    case "remove":
      const removContact = await removeContact(id);
      console.table(removContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
