
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdBK3V6T1kyQi9sMWNuRkVqOGRHNm0yQTkwblFtQk16QjdHNkpZZGxXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGtDeUJ2c09yUUY4SDg5M01nNXdzQ0kzY0tYUXlicDBwSG82NFJHaUZSZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHQVQ3Y0xvWVg3djNNbnVMQkpYamVOM1pmdWh6VVNpV0p2U24wVUNrNzFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIcDNad1l5UHhPZ1FEdmNnRmdLa3kzbURmNlUxeXBHMGdkSDNQNmxWUFRjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCZkFjSllKMWhRTE11NEFZbG56djUwLzZJVldNV01VRWpYdmw0c0dYM1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVONElFOFVkY2JlaEoxVHNRYmlhSURHbE16SVd3cVg4OTU5UE55ZDIrVDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1B1NjhaSFZDYVRxcFF3WldralQ2TjM5VTNVYnRBTmMxYTFXYmlZUFBtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTJzRU41cWgxZlBxbHZoREhKZUdaY2hpL1BWREhidnVFRlZ4TDE4cjAzWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRWa013Q0tPNk9HZy9STG9TQW0xZUdwQThjekxVcVlrWUQ2QWZTTTcxVWNTR0JOQWtCVk9Rdm1LaS9sMkF0d1FuSXZYaHBOZ1NwUVU5T1dYeUI0NmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6IjNsa1VWc1kwandYL2xlYXRDTSsvNVlMejFzZWt2SzluMjJxUHBRRVU1bFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTMzODc5NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjQxQzgyNTA3Q0E4REY5NTE1QkRBN0IyMDI4QUZBNTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc3NjM3NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTMzODc5NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDMyRDJGMEU5RDQzMjczNzRGOTQxODM0NTlDRDhCODUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc3NjM3NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTMzODc5NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNEQ3MTA0QzFBOEVBODMzNEVDRTBGNzdCODE2MkQyNTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc3NjM5MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTMzODc5NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzdEOTZFNTY4RkE0MThGOTg4OTlEOEVFMjE0RDc4QkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc3NjQwMn0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTMzODc5NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjAzRTU4Rjg2NjE1QjlGQkZBRTczM0VEMDc1QUQ0N0UifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc3NjQxMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSzJFOTFHTFQiLCJtZSI6eyJpZCI6Ijk2ODkzMzg3OTUzOjVAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNDcxMTE0Mzc5NDcwNDM6NUBsaWQiLCJuYW1lIjoiVGFzaHnwn6WwIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPS1VvdjBFRUtUMDZzSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1czVXMnhBOFp5MlF6bUZVUktXdjg1YkUrdHhhcVU0ZXlFVlRKVUdjbkdvPSIsImFjY291bnRTaWduYXR1cmUiOiJSTEIrWW8rTDRXclZzMS84S2hCSFdRZUw3SU9TVVArZTliZU5WOVdDSk9mOGMwV1RNRXp6UlRVeGkvZGZRck1CWmdTMDhOYXMrL2J2aVRkVk9qRXNEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoia3NlNW1qRS9JQ2VUaCs1ckV5MFkza1BQb0JVZFdnbEs4dGRmTlpBbFlMdmhUNmtuZW4xY1VkbnJuYzNCTEIzeUtzZzdaQTExTVhSM21JcWlsMkNGaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5Njg5MzM4Nzk1Mzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmViT1Z0c1FQR2N0a001aFZFU2xyL09XeFByY1dxbE9Ic2hGVXlWQm5KeHEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDc3NjM3MCwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJjSSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "carl",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "96893387953",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
