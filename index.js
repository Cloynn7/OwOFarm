const { Client } = require("discord.js-selfbot-v13");
const client = new Client({
  checkUpdate: false,
});
const config = require('./config.json');

const serverId = config.serverId;
const channelId = config.channelId;
const owo = "408785106942164992"; //OwO Bot UserID
const cmd = ["hunt", "battle", "cf 1000", "s 1000"];
let lastCommand = null;
cd = false;
farmStop = false;

client.on("ready", () => {
  console.clear();
  console.log(`${client.user.username} & Auto Farm Ready!`);
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    startFarm(channel);
  } else {
    console.log("[⚠️ - ERROR] Channel not found");
  }
});

async function startFarm(channel) {
  farmStop = false;
  await Promise.all([farm(channel), wpray(channel)]);
}

async function cooldown() {
  const channel = client.channels.cache.get(channelId);
  farmStop = true;
  const sleepInterval = sleepTime();
  console.log(`Waiting for ${sleepInterval} hour before the next loop...`);
  await sleep(sleepInterval * 3600 * 1000);
  farmStop = false;
  startFarm(channel);
}

async function farm(channel) {
  const loopCount = Math.floor(Math.random() * 31) + 20;
  console.log("[🤖 - LOOP COUNT] : " + loopCount);
  for (let i = 0; i < loopCount; i++) {
    let cmdChoice;
    do {
      const cmdChoiceIndex = Math.floor(Math.random() * cmd.length);
      cmdChoice = cmd[cmdChoiceIndex];
    } while (cmdChoice === lastCommand);
    lastCommand = cmdChoice;

    if (cmdChoice) {
      await channel.send("w" + cmdChoice);
      await channel.send("owo");
      console.log(
        "[🤖 - COMMAND] : " + cmdChoice + " " + (i + 1) + "/" + loopCount
      );
      const interval = randomInterval();
      console.log("[⏸ - PAUSE] : " + interval);
      await sleep(interval * 1000);
    }
  }
  cooldown(channel);
}

async function wpray(channel) {
  while (!farmStop) {
    await channel.send("wpray");
    console.log("[🙏 - COMMAND] : wpray");
    await sleep(300000);
  }
}

const randomInterval = () => {
  return Math.random() * (30 - 5) + 5;
};

const sleepTime = () => {
  const sleepArray = [0.5, 1, 2, 3, 4, 5, 6];
  return sleepArray[Math.floor(Math.random() * sleepArray.length)];
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

client.on("messageCreate", async (message) => {
  if (message.guild && message.guild.id === serverId) {
    if (message.author.id === owo) {
      if (message.content.toLowerCase().includes("captcha")) {
        console.log("Sistem berhenti karena ada verifikasi captcha.");
        // Warning System
        for (let i = 0; i < 20; i++) {
          message.channel.send(
            `<@${config.altId}> Butuh verifikasi captcha segera!`
          );
          await sleep(2000);
        }
        client.destroy();
      }
    }
  }
});

client.login(config.userToken);
