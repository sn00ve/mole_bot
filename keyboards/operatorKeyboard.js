import { InlineKeyboard } from "grammy";
import { OPERATORS, isSNW } from "../constants/index.js";
import { createButtons } from "./utils.js";

export function operatorKeyboard(conversation) {
	const { type } = conversation.session;

	let buttons = Object.keys(OPERATORS);

	if (type === "summary") {
		buttons = buttons.filter(operator => !isSNW(operator));
	}

	return InlineKeyboard.from(createButtons(buttons));
}
