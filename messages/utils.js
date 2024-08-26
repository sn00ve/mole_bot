import { waitAnswer } from "../conversations/utils.js";
import { OPERATORS, MESSAGES, MATCH_CONTACT } from "../constants/index.js";
import { isSNW, isSkipped, isDeposit } from "../constants/index.js";
import { getFloatNumber, getRandomNumber } from "../utils/index.js";
import { messageKeyboard } from "../keyboards/index.js";

export async function sendMenuMessage(ctx, messageId) {
	if (messageId) {
		await ctx.api.deleteMessage(ctx.chat.id, messageId);
	}

	await ctx.conversation.exit();

	return sendMessage("menu", undefined, ctx);
}

export async function sendMessage(prop, conversation, ctx) {
	if (!prop || !MESSAGES[prop]) return null;

	const message = MESSAGES[prop];

	const reply = await ctx.reply(message.text, {
		reply_markup: message.keyboard ? message.keyboard(conversation, ctx) : undefined
	});

	let value;

	if (conversation) {
		value = await waitAnswer(conversation, ctx);

		conversation.session[prop] = value;

		await ctx.api.deleteMessage(reply.chat.id, reply.message_id);
	}

	return {
		value,
		reply
	};
}

export function replyWithParse(ctx, message, conversation) {
	if (!message) return;

	return ctx.reply(message, {
		parse_mode: "HTML",
		disable_web_page_preview: true,
		disable_notification: true,
		reply_markup: messageKeyboard(conversation)
	});
}

export async function deleteMessages(ctx, start, end) {
	if (!start || !end) return;

	await ctx.api.deleteMessages(
		ctx.chat.id,
		[...Array(end - start - 1).keys()].map(i => i + start + 1)
	);
}

export function operatorText(operator) {
	return `${isSNW(operator) ? "🟣" : "🟢"} <b>#${operator}</b>\n`;
}

export function contactText(contact, direction, operator) {
	let text = `\n<b>${isDeposit(direction) ? "Выдает" : "Принимает"}:</b> `;

	if (!isSkipped(contact)) {
		text += contact;
	}

	if (operator) {
		const operatorUsername = Buffer.from(OPERATORS[operator].data, "hex").toString();

		text += `\n<b>${isDeposit(direction) ? "Принимает" : "Выдает"}:</b> ${operatorUsername}`;
	}

	return text;
}

export function clientText(client, direction) {
	if (client === MATCH_CONTACT) {
		return "";
	}

	let text = `\n<b>${isDeposit(direction) ? "Принимает" : "Выдает"}:</b>`;

	if (isSkipped(client)) {
		return text;
	}

	return `${text} ${client}`;
}

export function amountText(amount, currency) {
	const amountNumber = getFloatNumber(amount);

	let text = `\n<b>Сумма:</b>`;

	if (!Number.isNaN(amountNumber)) {
		return `${text} <code>${amountNumber}</code> ${currency}`;
	}

	return `${text}  ${currency}`;
}

export function calculationText(calculation, currency) {
	let text = `\n<b>Сумма:</b> `;

	if (calculation) {
		text += calculation;
	}

	if (currency) {
		text += ` ${currency}`;
	}

	return text;
}

export function walletText(wallet, link) {
	let text = `\n<b>Кошелек:</b> `;

	if (!wallet || isSkipped(wallet)) {
		return text;
	}

	if (!isSkipped(link)) {
		text += `<a href="${link}">${wallet}</a>`;
	} else {
		text += `<code>${wallet}</code>`;
	}

	return text;
}

export function codeText(code) {
	if (code === "without") {
		return "";
	}

	return `\n<b>Код:</b> ${code === "generate" ? getRandomNumber(10000, 99999) : code}`;
}

export function detailsText(details) {
	let text = `\n<b>Реквизиты:</b>`;

	if (isSkipped(details)) {
		return text;
	}

	return `${text} <code>${details.replace(/\s/g, "")}</code>`;
}
