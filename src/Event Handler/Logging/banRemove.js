const { EmbedBuilder, Events } = require('discord.js');
const theme = require('../../../embedConfig.json');
const Audit_Log = require('../../Schemas.js/auditlog');

//WORKING

module.exports = async (client) => {
    client.on(Events.GuildBanRemove, async (ban) => {
        const auditEmbed = new EmbedBuilder()
            .setColor(theme.theme)
            .setTitle('Ban Removed')
            .setDescription(`Member: ${ban.user.tag}`)
            .setTimestamp()
            .setFooter({ text: 'Nexus Audit Log System' });

        const data = await Audit_Log.findOne({ Guild: ban.guild.id });
        if (!data) return;

        const auditChannel = await client.channels.fetch(data.Channel).catch(() => null);
        if (auditChannel) {
            await auditChannel.send({ embeds: [auditEmbed] }).catch(() => {});
        }
    });
};
