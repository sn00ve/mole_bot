import * as dotenv from "dotenv";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { orderConversation, summaryConversation } from "./conversations/index.js";
import { COMMANDS, STICKERS } from "./constants/index.js";
import { isAdmin } from "./utils/index.js";
import { sendMessage, deleteMessages } from "./messages/utils.js";

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.api.setMyCommands(COMMANDS);

let startMessageId;

bot.command("start", async ctx => {
	if (!isAdmin(ctx.from.id)) {
		await ctx.api.sendSticker(ctx.chat.id, STICKERS.forbidden);

		return ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
	}

	const reply = await ctx.api.sendSticker(ctx.chat.id, STICKERS.permitted);

	startMessageId = reply.message_id;

	await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);

	await ctx.conversation.exit();

	await sendMessage("menu", undefined, ctx);
});

bot.command("menu", async ctx => {
	if (!isAdmin(ctx.from.id)) {
		return ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
	}

	await ctx.conversation.exit();

	const { reply } = await sendMessage("menu", undefined, ctx);

	deleteMessages(ctx, startMessageId, reply.message_id);
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
	await ctx.api.copyMessage(process.env.ACCOUNTING_CHANNEL_ID, ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.answerCallbackQuery();
});

bot.callbackQuery("saveCardMessage", async ctx => {
	await ctx.api.copyMessage(process.env.ACCOUNTING_CHANNEL_ID, ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.api.copyMessage(process.env.CARD_CHANNEL_ID, ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

	await ctx.answerCallbackQuery();
});

bot.on("message", async ctx => {
	return ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.catch(error => console.error(error));

bot.start();
