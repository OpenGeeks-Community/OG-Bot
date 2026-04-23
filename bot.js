require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // ⏰ Daily at 10 AM

  cron.schedule('* * * * *', async () => {
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (channel) {
      // Main update message with @everyone
      await channel.send(
        "@everyone 🔔 **How are you doing!**\n\n" +
        "💻 **What are you working on?**\n" +
        "🚀 **What did you complete recently?**\n" +
        "💡 **What would you like to see next in this community?**"
      );

      // 📚 Poll: What are you learning?
      await channel.send({
        poll: {
          question: { text: "📚 What are you learning?" },
          answers: [
            { text: "🔧 DevOps (K8s, Docker, Terraform, etc.)", emoji: "1️⃣" },
            { text: "🤖 Machine Learning", emoji: "2️⃣" },
            { text: "🧠 Artificial Intelligence", emoji: "3️⃣" },
          ],
          duration: 24,
          allowMultiselect: false,
        },
      });

      // 🔧 Poll: DevOps Topics
      await channel.send({
        poll: {
          question: { text: "🔧 Which DevOps topic are you learning?" },
          answers: [
            { text: "☸️ Kubernetes" },
            { text: "🐧 Linux" },
            { text: "🌐 Networking" },
            { text: "☁️ AWS" },
            { text: "🐳 Docker" },
            { text: "🔀 Git" },
            { text: "🔄 ArgoCD" },
            { text: "🏗️ Terraform" },
            { text: "📊 Prometheus" },
            { text: "📈 Grafana" },
          ],
          duration: 24,
          allowMultiselect: true,
        },
      });
    }
  });


});

client.login(process.env.DISCORD_TOKEN);