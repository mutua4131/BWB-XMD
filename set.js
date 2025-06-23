
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05tOU5OSVdTZ3RDR1k2eFpZUVRTVERGdThCR2pWN3MzcEJ0NWtQeiswTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzhMYlRkV2lmeHVhRnBNNUhaQ0laNGlGdURWb3hnaEl4MXNHL1JuREhSVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRVN1RzY4T1RxdFpvMDBBS1FnejBnVm9wWmlTOHVPb0xLU1dXSUlsL2s0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlbWpXZ3o4SERKbjg2NW4yTlIwZnJVckZIQWZYRWF1RndwamhKQ0pyRFVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktHR216dlJvdEN6Y3YrQk51Yld4Z3BLelQzYWYyMGFiWUFadUQwaSt1bHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHL1kySE94WFh2SzBXQWE3YU12SlRRSmFsbzY1b2ZWVTg1UkU3cTJjMk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEl6aDN4V094ZHZPdG5oblFzNWIxT2VEN3RQTnk2VSs5Q3piNnpZYloyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZCtCVnVrS3JZby9QTWlyTFhueVBrTHR5WHhUK3pmS3RCc1JIYVBiT2xHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpxdGwvdWxsTmIxdjAveHlVbGRnbG50Ykw5V2c3MHdvSy9ocUsvT0VJYWowMjVZMGRnNm45UGF3WGlLdGVkMkxrTSsxc0pjNEpqMUhYL2xXS3VTdGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJzbjg5UUh5NXVCdC9TTTBjdnY3dDhUQitlNUVlUDFWN0NLL3RpL3F5NWowPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk2ODkzMzg3OTUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNCMTY0NDI0RjdCQkQ5RUREN0MwQzJFODZGQTZDM0UzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA2OTU2NjZ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk2ODkzMzg3OTUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY3NTU5MjdDNkE2QjY1OUQxNzcwMDU3NjM0NUU2MTEyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA2OTU2Njd9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk2ODkzMzg3OTUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA2NzRFMzI1NjY3NzgzM0YwNjk1RjIyQjBDMUQyMEEwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA2OTU2OTZ9XSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkoxNUNUTkVWIiwibWUiOnsiaWQiOiI5Njg5MzM4Nzk1MzozQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTQ3MTExNDM3OTQ3MDQzOjNAbGlkIiwibmFtZSI6IlRhc2h58J+lsCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0NVb3YwRUVPSDk1Y0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNXM1VzJ4QThaeTJRem1GVVJLV3Y4NWJFK3R4YXFVNGV5RVZUSlVHY25Hbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidVlzRWpXaGZlWG5UZ3V6WEs2VlFpNHZUcFVTblA2QlNuRmlzaW54dGJnS24rMHRuSzA1b1laVTFxL1NTOHowLy9QWGdsd3V4aXpPbURFN1hLeUU5QlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImxJakxnZ2dxeXpFSVRvUVRmUlpkRGE3Mmtvakdoc01INXVpSlR5ZkZ2aEdjcStEUSt3aXgySDZ2V3JSNTdjT1JnZFIwUDJDNGxCbFhWRHVwVExXcWhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTY4OTMzODc5NTM6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlYk9WdHNRUEdjdGtNNWhWRVNsci9PV3hQcmNXcWxPSHNoRlV5VkJuSnhxIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA2OTU2NjIsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCY0UifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
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
