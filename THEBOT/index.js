const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

const config = require('./config.json')
const firstMessage = require('./first-message')
const roleClaim = require('./role-claim')
const command = require('./command')

client.on('ready', () => {
    console.log('The client is Ready!')

    

    roleClaim(client)

    command(client, 'ping', message => {
        message.channel.send('Pong!')
    
        command(client, ['cc', 'clearchannel'], message =>{
            if (message.member.hasPermission('MODERATOR')) {
               message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
               })
            }
        })
    
    })
    command(client, 'status', message =>{
        const content= message.content.replace('!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            }

        })
    })
})

client.login(config.token)