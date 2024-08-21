import { operatorText, amountText, contactText, walletText, replyWithParse } from "./utils.js";

export function gzprmMessage(conversation, ctx) {
	const { operator, direction, currency, contact, amount, wallet, link } = conversation.session;

	let message = operatorText(operator);
	message += amountText(amount, currency);
	message += contactText(contact, direction);
	message += "\n";
	message += walletText(wallet, link);

	return replyWithParse(ctx, message, conversation);
}
