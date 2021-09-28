import { Message } from 'discord.js';

const isMessageInGuild = (message: Message): boolean => !!message.guild;

export default isMessageInGuild;
