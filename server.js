// © 2025 Sanya — Licensed under the MIT License

const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");
const MESSAGES_FILE = path.join(__dirname, "messages.json");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// helper
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function loadMessages() {
  if(!fs.existsSync(MESSAGES_FILE)) return [];
  return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
}

function saveMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// Generate consistent chat ID - MAKE SURE THIS FUNCTION EXISTS
function getChatId(user1, user2) {
  return [user1, user2].sort().join("_");
}

// Add a friend to user's chat list
function addChatToUser(user, friend) {
  const users = loadUsers();
  const userIndex = users.findIndex(u => u.username === user);
  if (userIndex !== -1) {
    users[userIndex].chats = users[userIndex].chats || [];
    // Only add friend if it's a valid string username and not already present
    if (typeof friend === 'string' && friend !== user && !users[userIndex].chats.includes(friend)) {
      users[userIndex].chats.push(friend);
    }
    // Remove any non-string values from chats
    users[userIndex].chats = users[userIndex].chats.filter(c => typeof c === 'string');
    saveUsers(users);
  }
}

// register
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: "Fill all fields" });
  
  const users = loadUsers();
  if (users.find(u => u.username === username)) return res.json({ success: false, message: "Username taken" });
  
  users.push({ username, password, chats: [] });
  saveUsers(users);
  res.json({ success: true });
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) return res.json({ success: true });
  res.json({ success: false, message: "Invalid username or password" });
});

// search
app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.json([]);
  
  const users = loadUsers();
  const results = users.map(u => u.username).filter(name => name.toLowerCase().includes(query));
  res.json(results);
});

// last chat
app.get("/mychats", (req, res) => {
  const username = req.query.username;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  // Only return string usernames in chats
  res.json((user?.chats || []).filter(c => typeof c === 'string'));
});

// get messages
app.get("/messages", (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.json([]);
  
  const chatId = getChatId(user1, user2); // This should work now
  const messages = loadMessages();
  const filtered = messages.filter(m => m.chat === chatId);
  res.json(filtered);
});

// send message
app.post("/send", (req, res) => {
  const { user1, user2, from, message } = req.body;
  if (!user1 || !user2 || !from || !message) return res.json({ success: false });
  
  const chatId = getChatId(user1, user2); // This should work now
  const messages = loadMessages();
  messages.push({ chat: chatId, from, message, timestamp: new Date().toISOString() });
  saveMessages(messages);

  // Add friend to both users' chat lists
  addChatToUser(user1, user2);
  addChatToUser(user2, user1);

  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
