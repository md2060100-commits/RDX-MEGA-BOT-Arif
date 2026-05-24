function formatMessage(message) {
  return {
    type: message.type || "message",
    senderID: message.senderID || message.userID || message.from,
    threadID: message.threadID || message.threadID || message.gid,
    messageID: message.messageID || message.msgID || message.mid,
    body: message.body || message.text || message.message || "",
    timestamp: message.timestamp || Date.now(),
    isGroup: message.threadType === "group" || message.isGroup,
    attachments: message.attachments || [],
    mentions: message.mentions || [],
    emoji: message.emoji || null,
    sticker: message.sticker || null,
    location: message.location || null
  };
}

function formatThread(thread) {
  return {
    threadID: thread.threadID || thread.id || thread.gid,
    name: thread.name || thread.threadName || "",
    participants: thread.participants || [],
    participantIDs: thread.participantIDs || thread.allPos || [],
    adminIDs: thread.adminIDs || [],
    threadType: thread.threadType || (thread.isGroup ? "group" : "user"),
    emoji: thread.emoji || null,
    color: thread.color || null,
    avatar: thread.avatar || null,
    muteUntil: thread.muteUntil || null,
    isArchived: thread.isArchived || false,
    isGroup: thread.isGroup || thread.threadType === "group",
    messageCount: thread.messageCount || thread.msgCount || 0,
    lastMessage: thread.lastMessage || thread.snippet || "",
    lastActivity: thread.lastActivity || thread.lastMessageTimestamp || Date.now()
  };
}

function formatUser(user) {
  return {
    userID: user.userID || user.id,
    name: user.name || user.fullName || "",
    firstName: user.firstName || user.first_name || "",
    lastName: user.lastName || user.last_name || "",
    username: user.username || user.name || "",
    avatar: user.avatar || user.profilePic || user.picture || "",
    gender: user.gender || null,
    birthday: user.birthday || null,
    email: user.email || null,
    locale: user.locale || null,
    timezone: user.timezone || null
  };
}

module.exports = {
  formatMessage,
  formatThread,
  formatUser
};
module.exports.credits = "SARDAR RDX";
