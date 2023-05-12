// This code saves the chatgpt messages to a file in HTML format, but only the chat section and not the full UI of chatgpt.

// Get the current chatgpt messages.
const messages = chrome.tabs.query({ active: true })[0].chatgpt.messages;

// Create a new file to save the messages to.
const now = new Date();
const filename = `chatgpt-messages-${now.toISOString()}.html`;
const blob = new Blob([messages], {type: 'text/html'});

// Save the file to the user's Downloads directory.
chrome.downloads.create(blob, {
  saveAs: true,
  filename: filename
});

// Create a new HTML document.
const doc = document.createElement('html');

// Create a new HTML body.
const body = document.createElement('body');

// Create a new unordered list.
const list = document.createElement('ul');

// Add the chat messages to the unordered list.
messages.forEach(message => {
  const li = document.createElement('li');
  li.textContent = message;
  list.appendChild(li);
});

// Add the unordered list to the body.
body.appendChild(list);

// Add the body to the HTML document.
doc.appendChild(body);

// Write the HTML document to a file.
const writer = new FileWriter(filename);
writer.write(doc.outerHTML);
writer.close();
