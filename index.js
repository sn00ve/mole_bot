import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { orderConversation, reportConversation } from "./conversations/index.js";
import { STICKERS, MENU_BUTTON } from "./constants/index.js";
import { isAdmin } from "./utils/index.js";
import { sendMenuMessage, deleteMessages } from "./messages/utils.js";
import { startKeyboard } from "./keyboards/index.js";

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

let startMessageId;

bot.hears(MENU_BUTTON, async ctx => {
    const { reply } = await sendMenuMessage(ctx);

    if (!startMessageId) {
        startMessageId = ctx.message.message_id - 2;
    }

    deleteMessages(ctx, startMessageId, reply.message_id);
});

bot.use(createConversation(orderConversation));
bot.use(createConversation(reportConversation));

bot.command("start", async ctx => {
    if (!isAdmin(ctx.from.id)) {
        await ctx.api.sendSticker(ctx.chat.id, STICKERS.forbidden);

        return ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }

    const reply = await ctx.api.sendSticker(ctx.chat.id, STICKERS.permitted, {
        reply_markup: startKeyboard()
    });

    startMessageId = reply.message_id;

    sendMenuMessage(ctx, ctx.message.message_id);
});

bot.callbackQuery("createOrder", async ctx => {
    await ctx.conversation.enter("orderConversation");

    await ctx.answerCallbackQuery();
});

bot.callbackQuery("sendReport", async ctx => {
    await ctx.conversation.enter("reportConversation");

    await ctx.answerCallbackQuery();
});

bot.callbackQuery("saveMessage", async ctx => {
    await ctx.api.copyMessage(process.env.CHANNEL_ID, ctx.chat.id, ctx.callbackQuery.message.message_id);

    sendMenuMessage(ctx, ctx.callbackQuery.message.message_id);

    await ctx.answerCallbackQuery();
});

bot.on("message", async ctx => {
    return ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.catch(error => console.error(error));

bot.start();
