import { InlineKeyboard } from "grammy";
import { SKIP_DATA } from "../constants/index.js";

export function createButtons(buttons) {
	return buttons.map(button => [InlineKeyboard.text(button)]);
}

export function withSkipButton(keyboard) {
	return keyboard.row().text("Пропустить", SKIP_DATA);
}
