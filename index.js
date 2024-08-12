import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { orderConversation, summaryConversation } from "./conversations/index.js";
import { COMMANDS } from "./constants/index.js";
import { isAdmin } from "./utils/index.js";
import { sendMessage } from "./messages/utils.js";

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.api.setMyCommands(COMMANDS);

bot.command("start", async ctx => {
	const userId = ctx.from.id;

	await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);

	if (!isAdmin(userId)) {
		return await sendMessage("forbidden", undefined, ctx);
	}

	await ctx.conversation.exit();

	await sendMessage("start", undefined, ctx);
});

bot.use(createConversation(orderConversation));
bot.use(createConversation(summaryConversation));

bot.callbackQuery("createOrder", async ctx => {
	await ctx.conversation.exit();

	await ctx.conversation.enter("orderConversation");

	await ctx.answerCallbackQuery();
});

bot.callbackQuery("createSummary", async ctx => {
	await ctx.conversation.exit();

	await ctx.conversation.enter("summaryConversation");

	await ctx.answerCallbackQuery();
});

bot.callbackQuery("saveMessage", async ctx => {
	await ctx.api.copyMessage(process.env.CHANNEL_ID, ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.answerCallbackQuery();
});

bot.catch(error => console.error(error));

bot.start();
