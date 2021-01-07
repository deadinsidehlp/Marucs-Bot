const addReactions = (message, reactions) => {
    reactions.forEach((reaction) => {
        message.react(reaction);
        });
        reactions.shift()
    message.react(reactions[0])
    reactions.shift()
    if (reactions.lenght > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
    }
}

module.exports = async (client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id)
    
    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            //send a new message
            channel.send(text).then((message) => {
                addReactions(message, reactions)
            })
        } else {
            // Edit the existing message
            for (const message of messages) {
                message[1].edit(text)
                addReactions(message[1], reactions)
            }
        }
    })
}