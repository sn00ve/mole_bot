import { isSNW, isGZPRM, isDSPT, isCRPTX, isRUB, isEUR, isSkipped, isDeposit } from "../constants/index.js";
import { sendMessage } from "../messages/utils.js";
import { gzprmMessage, cardMessage, dsptMessage, crptxMessage, snwMessage, orderMessage } from "../messages/index.js";

export async function orderConversation(conversation, ctx) {
	await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

	const { value: operator } = await sendMessage("operator", conversation, ctx);

	await sendMessage("direction", conversation, ctx);
	await sendMessage("currency", conversation, ctx);
	await sendMessage("contact", conversation, ctx);

	if (isSNW(operator)) {
		return snwOrder(conversation, ctx);
	}

	return operatorOrder(conversation, ctx);
}

async function snwOrder(conversation, ctx) {
	const { direction, currency, contact } = conversation.session;

	if (isGZPRM(contact)) {
		await sendMessage("amount", conversation, ctx);

		const { value: wallet } = await sendMessage("wallet", conversation, ctx);

		if (!isSkipped(wallet)) {
			await sendMessage("link", conversation, ctx);
		}

		return await gzprmMessage(conversation, ctx);
	}

	if (isDSPT(contact)) {
		const { value: amount } = await sendMessage("amount", conversation, ctx);

		if (!isSkipped(amount)) {
			await sendMessage("rate", conversation, ctx);
		}

		const { value: wallet } = await sendMessage("wallet", conversation, ctx);

		if (!isSkipped(wallet)) {
			await sendMessage("link", conversation, ctx);
		}

		return dsptMessage(conversation, ctx);
	}

	if (isDeposit(direction) && isRUB(currency)) {
		const { value: amount } = await sendMessage("amount", conversation, ctx);

		if (!isSkipped(amount)) {
			await sendMessage("rate", conversation, ctx);
		}

		await sendMessage("details", conversation, ctx);

		const { value: wallet } = await sendMessage("wallet", conversation, ctx);

		if (!isSkipped(wallet)) {
			await sendMessage("link", conversation, ctx);
		}

		return cardMessage(conversation, ctx);
	}

	await sendMessage("amount", conversation, ctx);

	const { value: wallet } = await sendMessage("wallet", conversation, ctx);

	if (!isSkipped(wallet)) {
		await sendMessage("link", conversation, ctx);
	}

	return snwMessage(conversation, ctx);
}

async function operatorOrder(conversation, ctx) {
	const { contact, currency } = conversation.session;

	if (isDSPT(contact)) {
		const { value: amount } = await sendMessage("amount", conversation, ctx);

		if (!isSkipped(amount)) {
			await sendMessage("rate", conversation, ctx);
			await sendMessage("rateUsdt", conversation, ctx);
		}

		return dsptMessage(conversation, ctx);
	}

	if (isCRPTX(contact)) {
		const { value: amount } = await sendMessage("amount", conversation, ctx);

		if (!isSkipped(amount)) {
			await sendMessage("rate", conversation, ctx);
		}

		return crptxMessage(conversation, ctx);
	}

	await sendMessage("client", conversation, ctx);

	const { value: amount } = await sendMessage("amount", conversation, ctx);

	if (!isSkipped(amount)) {
		await sendMessage("rate", conversation, ctx);

		if (isEUR(currency)) {
			await sendMessage("rateCross", conversation, ctx);
		}
	}

	const { value: wallet } = await sendMessage("wallet", conversation, ctx);

	if (!isSkipped(wallet)) {
		await sendMessage("link", conversation, ctx);
	}

	await sendMessage("code", conversation, ctx);

	await orderMessage(conversation, ctx);
}
