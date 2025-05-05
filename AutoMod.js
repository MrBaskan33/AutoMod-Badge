const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")

module.exports = {
  slash: true,
  data: new SlashCommandBuilder()    
    .setName('automod')
    .setDescription('Auto mod sistemi.')
    .setDMPermission(false)
    .addSubcommand((command) =>
      command
        .setName('flagged-words')
        .setDescription('Flagged words AutoMod\'unu açar.'))
    .addSubcommand((command) =>
      command
        .setName('spam-messages')
        .setDescription('Spam messages AutoMod\'unu açar.'))
    .addSubcommand((command) =>
      command
        .setName('mention-spam')
        .setDescription('Mention spam AutoMod\'unu açar.'))
    .addSubcommand((command) =>
      command
        .setName('keyword')
        .setDescription('Keyword AutoMod\'unu açar.')
        .addStringOption(option =>
          option
            .setName('kelime')
            .setDescription('AutoMod açılacak kelime.')
            .setRequired(true))),
  
async execute(client, interaction) { 
  
  await interaction.deferReply()
 
  if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.editReply({content: `AutoMod açmak için **Yönetici** yetkisine sahip olmalısın.`})

  if(interaction.options.getSubcommand() === 'spam-messages') {
    
    await interaction.editReply({content: `AutoMod kuralı kuruluyor.`})
      
    const Kural = await interaction.guild.autoModerationRules.create({
      name: 'Spam messages',
      creatorId: client.user.id,
      enabled: true,
      eventType: 1,
      triggerType: 3,
      triggerMetadata: {
        mentionTotalLimit: 5
      },
      actions: [
        {
          type: 1,
          metadata: {
            channel: interaction.channel,
            durationSeconds: 10,
            customMessage: 'Your message was blocked by AutoMod.'
          }
        }
      ]
    }).catch(async hata => {
      setTimeout(async () => {
        await interaction.editReply({content: `AutoMod kuralı uygulanırken bir hata meydana geldi. Hata: \`${hata}\``})
      }, 2000)
    })
    setTimeout(async () => {
      if(!Kural) return 
      await interaction.editReply({content: `AutoMod kuralı başarılı şekilde oluşturuldu.`})
    }, 3000)
  }
   
  if(interaction.options.getSubcommand() === 'flagged-words') {
    
    await interaction.editReply({content: `AutoMod kuralı kuruluyor.`})
      
    const Kural2 = await interaction.guild.autoModerationRules.create({
      name: 'Flagged words',
      creatorId: client.user.id,
      enabled: true,
      eventType: 1,
      triggerType: 4,
      triggerMetadata: {
      presets: [1, 2, 3]
    },
    actions: [
      {
        type: 1,
        metadata: {
          channel: interaction.channel,
          durationSeconds: 10,
          customMessage: 'Your message was blocked by AutoMod.'
        }
      }
    ]
  }).catch(async hata => {
    setTimeout(async () => {
      await interaction.editReply({content: `AutoMod kuralı uygulanırken bir hata meydana geldi. Hata: \`${hata}\``})
    }, 2000)
  })
  setTimeout(async () => {
    if(!Kural2) return 
    await interaction.editReply({content: `AutoMod kuralı başarılı şekilde oluşturuldu.`})
    }, 3000)
  }
    
  if(interaction.options.getSubcommand() === 'mention-spam') {
    
    await interaction.editReply({content: `AutoMod kuralı kuruluyor.`})
      
    const Kural3 = await interaction.guild.autoModerationRules.create({
      name: 'Mention spam',
      creatorId: client.user.id,
      enabled: true,
      eventType: 1,
      triggerType: 5,
      triggerMetadata: {
        mentionTotalLimit: 5
      },
      actions: [
        {
          type: 1,
          metadata: {
            channel: interaction.channel,
            durationSeconds: 10,
            customMessage: 'Your message was blocked by AutoMod.'
          }
        }
      ]
    }).catch(async hata => {
      setTimeout(async () => {
        await interaction.editReply({content: `AutoMod kuralı uygulanırken bir hata meydana geldi. Hata: \`${hata}\``})
      }, 2000)
    })
    setTimeout(async () => {
      if(!Kural3) return 
      await interaction.editReply({content: `AutoMod kuralı başarılı şekilde oluşturuldu.`})
    }, 3000)
  }
    
  if(interaction.options.getSubcommand() === 'keyword') {
    
    await interaction.editReply({content: `AutoMod kuralı kuruluyor.`})
    const Kelime = interaction.options.getString('kelime')
  
    const Kural4 = await interaction.guild.autoModerationRules.create({
      name: 'Keyword',
      creatorId: client.user.id,
      enabled: true,
      eventType: 1,
      triggerType: 1,
      triggerMetadata: {
        keywordFilter: [`${Kelime}`]
      },
      actions: [
        {
          type: 1,
          metadata: {
            channel: interaction.channel,
            durationSeconds: 10,
            customMessage: 'Your message was blocked by AutoMod.'
          }
        }
      ]
    }).catch(async hata => {
      setTimeout(async () => {
        await interaction.editReply({content: `AutoMod kuralı uygulanırken bir hata meydana geldi. Hata: \`${hata}\``})
      }, 2000)
    })
    setTimeout(async () => {
      if(!Kural4) return 
      await interaction.editReply({content: `AutoMod kuralı başarılı şekilde oluşturuldu.`})
    }, 3000)
  }
  
  }
}
