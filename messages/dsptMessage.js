import { DSPT_USDT_FEE, DSPT_RUB_FEE, isSNW } from "../constants/index.js";
import { operatorText, contactText, calculationText, walletText, replyWithParse } from "./utils.js";
import { getRoundNumber } from "../utils/index.js";

export function dsptMessage(conversation, ctx) {
	const { operator, direction, currency, contact, amount, rate, rateUsdt, wallet, link } = conversation.session;

	if (isSNW(operator)) {
		const roundAmount = (amount / (rate * DSPT_USDT_FEE)).toFixed(5);

		const calculation = `${amount}/(${rate}*${DSPT_USDT_FEE}) = <code>${roundAmount}</code>`;

		let message = operatorText(operator);
		message += calculationText(calculation, currency);
		message += contactText(contact, direction);
		message += "\n\n";
		message += walletText(wallet, link);

		return replyWithParse(ctx, message);
	}

	const roundAmount = getRoundNumber(amount * rate * DSPT_USDT_FEE * (rateUsdt - DSPT_RUB_FEE), 1000);

	const calculation = `${amount}*${rate}*${DSPT_USDT_FEE}*(${rateUsdt}-${DSPT_RUB_FEE}) = <code>${roundAmount}</code>`;

	let message = operatorText(operator);
	message += calculationText(calculation, currency);
	message += contactText(contact, direction, operator);

	return replyWithParse(ctx, message);
}
