import { isUSD, isRUB } from "../constants/index.js";
import { getFloatNumber } from "../utils/index.js";
import { operatorText, amountText, contactText, calculationText, replyWithParse } from "./utils.js";

export function crptxMessage(conversation, ctx) {
	const { operator, direction, currency, contact, amount, rate } = conversation.session;

	const amountNumber = getFloatNumber(amount);
	const rateNumber = getFloatNumber(rate);

	const rateUsd = 1 + rateNumber / 100;

	let calculation;

	if (!Number.isNaN(amountNumber) && !Number.isNaN(rateNumber)) {
		if (isUSD(currency)) {
			calculation = `${amount}/${rateUsd} = <code>${Math.ceil(amount / rateUsd)}</code>`;
		} else if (isRUB(currency)) {
			calculation = `${amount}/${rate} = <code>${Math.ceil(amount / rate)}</code>`;
		}
	}

	let message = operatorText(operator);
	message += amountText(amount, currency);
	message += contactText(contact, direction, operator);

	if (calculation) {
		message += "\n\n";
		message += calculationText(calculation, "USDT");
	}

	return replyWithParse(ctx, message, conversation);
}
