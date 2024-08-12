import { replyWithParse } from "./utils.js";

export async function summaryMessage(conversation, ctx) {
	const { operator, currencies } = conversation.session;

	if (!currencies?.length) return;

	const now = new Date(await conversation.now());

	const date = now.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "numeric"
	});

	let message = `🟢 <b>#${operator} за ${date}</b>\n\n`;

	currencies.map((currency, index) => {
		message += `<b>${currency}</b>`;
		message += "\n\n\n\n";
		message += `<b>Итого:</b>  ${currency}`;

		if (index < currencies.length - 1) {
			message += "\n\n\n";
		}
	});

	return replyWithParse(ctx, message);
}
