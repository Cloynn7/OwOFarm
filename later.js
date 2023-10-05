const { Client } = require("discord.js-selfbot-v13");
const client = new Client({
    checkUpdate: false,
});

const serverId = "1082938047844323398";
const channelId = "1083239123109822474";
const owo = "408785106942164992";
const cmd = ["hunt", "battle", "cf 1000", "s 1000"];

client.on("ready", () => {
    console.clear();
    console.log(`${client.user.username} & Auto Farm Ready!`);
    const channel = client.channels.cache.get(channelId);
    if (channel) {
        farm(channel);
        wpray(channel);
    } else {
        console.log("[⚠️ - ERROR] Channel not found");
    }
});

client.on("messageCreate", async (message) => {
    if (message.guild && message.guild.id === serverId) {
        if (message.author.id === owo) {
            if (message.content.toLowerCase().includes("captcha")) {
                console.log("Sistem berhenti karena ada verifikasi captcha.");
                for (let i = 0; i < 20; i++) {
                    message.channel.send(
                        "<@383698812256124928> Butuh verifikasi captcha segera!"
                    );
                    await sleep(2000)
                }
                client.destroy();
            }
        }
    }
});

const randomInterval = () => {
    return Math.random() * (30 - 5) + 5; // Generate a random float between 5 and 30
};

const sleepTime = () => {
    const sleepArray = [0.5, 1, 2, 3, 4, 5, 6]
    return sleepArray[Math.floor(Math.random() * sleepArray.length)]
}

async function farm(channel) {
    await channel.send("# Auto Farm Enabled");
    while (true) {
        const loopCount = Math.floor(Math.random() * 31) + 20; // Generates a random integer between 20 and 50 (inclusive)
        console.log("[🤖 - LOOP COUNT] : " + loopCount);
        for (let i = 0; i < loopCount; i++) {
            const cmdChoiceIndex = Math.floor(Math.random() * cmd.length); // Generates a random integer between 0 and cmd.length
            const cmdChoice = cmd[cmdChoiceIndex]; // Select a random command from the cmd array

            if (cmdChoice) {
                await channel.send("w" + cmdChoice);
                await channel.send("owo");
                console.log("[🤖 - COMMAND] : " + cmdChoice);
                const interval = randomInterval();
                console.log("[⏸ - PAUSE] : " + interval);
                await sleep(interval * 1000);
            }
        }

        const sleepInterval = sleepTime();
        console.log(`Waiting for ${sleepInterval} hour before the next loop...`);
        await sleep(sleepInterval * 3600 * 1000);
    }
}

// Function to sleep for a specified number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function wpray(channel) {
    while (true) {
        await channel.send("wpray");
        console.log("[🙏 - COMMAND] : wpray");
        await sleep(300000);
    }
}

client.login(
    "MTAyMzc5Njc2OTM4MzAxMDM0NQ.GqtVEv.SQHbhAKAjyRkB0PfmKIuyUzM4oWeQTtpz35Ggs"
);  