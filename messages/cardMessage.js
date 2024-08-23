import {
	operatorText,
	amountText,
	calculationText,
	contactText,
	detailsText,
	walletText,
	replyWithParse
} from "./utils.js";
import { getFloatNumber } from "../utils/index.js";

export function cardMessage(conversation, ctx) {
	const { operator, direction, currency, contact, amount, rate, wallet, link, details } = conversation.session;

	const amountNumber = getFloatNumber(amount);
	const rateNumber = getFloatNumber(rate);

	let calculation;

	if (!Number.isNaN(amountNumber) && !Number.isNaN(rateNumber)) {
		calculation = `${amountNumber}/${rateNumber} = <code>${Math.ceil(amountNumber / rateNumber)}</code>`;
	}

	let message = operatorText(operator);
	message += amountText(amount, currency);
	message += contactText(contact, direction);
	message += "\n";
	message += detailsText(details);
	message += "\n\n";
	message += calculationText(calculation, "USDT");
	message += "\n";
	message += walletText(wallet, link);

	return replyWithParse(ctx, message, conversation);
}
