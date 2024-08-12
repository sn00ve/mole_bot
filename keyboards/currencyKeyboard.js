import { InlineKeyboard } from "grammy";
import { CURRENCIES, isSNW, isDeposit } from "../constants/index.js";
import { createButtons } from "./utils.js";

export function currencyKeyboard(conversation) {
	const { operator, direction } = conversation.session;

	let currencyList;

	if (isSNW(operator)) {
		currencyList = [CURRENCIES.USDT, CURRENCIES.BTC];

		if (isDeposit(direction)) {
			currencyList.unshift(CURRENCIES.RUB);
		}
	} else {
		currencyList = [CURRENCIES.USD, CURRENCIES.RUB, CURRENCIES.EUR];
	}

	return InlineKeyboard.from(createButtons(currencyList));
}
