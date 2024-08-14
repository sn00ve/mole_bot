import { InlineKeyboard } from "grammy";
import { OPERATORS, isSNW } from "../constants/index.js";

export function operatorKeyboard(conversation) {
	const { type } = conversation.session;

	return InlineKeyboard.from(
		Object.keys(OPERATORS)
			.filter(operator => type !== "summary" || !isSNW(operator))
			.map(direction => [InlineKeyboard.text(direction)])
	);
}
