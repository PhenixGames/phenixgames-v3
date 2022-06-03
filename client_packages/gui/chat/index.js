// Disables default RageMP Chat
mp.gui.chat.show(false);

// Initialize chatbox CEF, mark it as default server chat
const chatbox = mp.browsers.new('package://gui/chat/chat-ui/index.html');
chatbox.markAsChat();


mp.events.add("chat:push", chatbox.push)
mp.events.add("chat:clear", chatbox.clear)
mp.events.add("chat:activate", chatbox.activate)
mp.events.add("chat:show", chatbox.show)
mp.gui.chat.colors = true;