import { InlineKeyboard } from "grammy";
import { isSNW, isRUB, isDeposit } from "../constants/index.js";

export function messageKeyboard(conversation) {
	const { operator, direction, currency } = conversation.session;

	let data = "saveMessage";

	if (isSNW(operator) && isDeposit(direction) && isRUB(currency)) {
		data = "saveCardMessage";
	}

	return new InlineKeyboard().text("Сохранить", data);
}
