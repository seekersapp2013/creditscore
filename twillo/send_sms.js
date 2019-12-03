// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC02aade624a5a5b60d4a1c8811aeeea71';
const authToken = 'bfa5293bd6aa0fc668acbe283f7f9f2b';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14109883790',
     to: '+2348029757670'
   })
  .then(message => console.log(message.sid));
