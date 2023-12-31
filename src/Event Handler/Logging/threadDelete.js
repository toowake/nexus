const { EmbedBuilder, Events } = require("discord.js");
const theme = require("../../../embedConfig.json");
const Audit_Log = require("../../Schemas.js/auditlog");

module.exports = async (client) => {
    //Thread Delete
    client.on(Events.ThreadDelete, async (thread) => {
      const data = await Audit_Log.findOne({
          Guild: thread.guild.id,
      })
      let logID;
      if (data) {
          logID = data.Channel
      } else {
          return;
      }
      const auditEmbed = new EmbedBuilder().setColor(theme.theme).setTimestamp().setFooter({ text: "Nexus Audit Log System"})
      const auditChannel = client.channels.cache.get(logID);
    
      auditEmbed.setTitle("Thread Deleted").addFields(
          {name: "Name:", value: thread.name, inline: false},
          {name: "Tag:", value: `<#${thread.id}>`, inline: false},
          {name: "ID:", value: thread.id, inline: false},
      )
      await auditChannel.send({ embeds: [auditEmbed]}).catch((err) => {return;});
    })

}