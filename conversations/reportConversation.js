import { InputFile } from "grammy";
import { REPORT_PATH } from "../constants/index.js";
import { waitAnswer } from "../conversations/utils.js";
import { MESSAGES } from "../constants/index.js";
import { decode } from "../utils/index.js";

export async function reportConversation(conversation, ctx) {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

    const message = MESSAGES["password"];

    const reply = await ctx.reply(message.text);

    const password = await waitAnswer(conversation, ctx);

    if (password === decode(process.env.REPORT_KEY)) {
        try {
            await ctx.replyWithDocument(new InputFile(REPORT_PATH));
        } catch (error) {}
    }

    await ctx.api.deleteMessage(reply.chat.id, reply.message_id);
}
