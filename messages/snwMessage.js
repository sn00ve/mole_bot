import { operatorText, amountText, calculationText, contactText, walletText, replyWithParse } from "./utils.js";

export function snwMessage(conversation, ctx) {
	const { operator, direction, currency, contact, amount, wallet, link } = conversation.session;

	let message = operatorText(operator);
	message += amountText(amount, currency);
	message += contactText(contact, direction);
	message += "\n";
	message += walletText(wallet, link);
	message += "\n\n";
	message += calculationText();
	message += "\n";
	message += walletText();

	return replyWithParse(ctx, message);
}
