import {
	operatorText,
	amountText,
	contactText,
	codeText,
	clientText,
	calculationText,
	walletText,
	replyWithParse
} from "./utils.js";
import { getFloatNumber } from "../utils/index.js";
import { isUSD, isRUB, isEUR } from "../constants/index.js";

export function orderMessage(conversation, ctx) {
	const { operator, direction, currency, contact, client, amount, rate, rateCross, wallet, link, code } =
		conversation.session;

	const amountNumber = getFloatNumber(amount);
	const rateNumber = getFloatNumber(rate);
	const rateCrossNumber = getFloatNumber(rateCross);

	const rateUsd = 1 + rateNumber / 100;

	let calculation;

	if (!Number.isNaN(amountNumber) && !Number.isNaN(rateNumber)) {
		if (isUSD(currency)) {
			calculation = `${amount}/${rateUsd} = <code>${Math.ceil(amount / rateUsd)}</code>`;
		} else if (isRUB(currency)) {
			calculation = `${amount}/${rate} = <code>${Math.ceil(amount / rate)}</code>`;
		} else if (isEUR(currency)) {
			calculation = `${amount}*${rateCrossNumber}/${rateUsd} = <code>${Math.ceil(
				(amount * rateCrossNumber) / rateUsd
			)}</code>`;
		}
	}

	let message = operatorText(operator);
	message += amountText(amount, currency);
	message += contactText(contact, direction, operator);
	message += codeText(code);
	message += "\n\n";
	message += calculationText(calculation, "USDT");
	message += clientText(client, direction);
	message += "\n";
	message += walletText(wallet, link);

	return replyWithParse(ctx, message, conversation);
}
