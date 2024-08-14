import { sendMessage } from "../messages/utils.js";
import { summaryMessage } from "../messages/index.js";
import { CURRENCIES } from "../constants/index.js";
import { waitAnswer } from "../conversations/utils.js";
import { optionKeyboard } from "../keyboards/index.js";

export async function summaryConversation(conversation, ctx) {
	await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

	conversation.session.type = "summary";

	await sendMessage("operator", conversation, ctx);

	conversation.session.currencies = [];

	const currencies = [CURRENCIES.EUR, CURRENCIES.USD, CURRENCIES.RUB];

	for (let i = 0; i < currencies.length; i++) {
		const currency = currencies[i];

		const reply = await ctx.reply(`🤔 Добавить ${currency}?`, {
			reply_markup: optionKeyboard()
		});

		const value = await waitAnswer(conversation, ctx);

		if (value === "yes") {
			conversation.session.currencies.push(currency);
		}

		await ctx.api.deleteMessage(reply.chat.id, reply.message_id);
	}

	await summaryMessage(conversation, ctx);
}
