import { InlineKeyboard } from "grammy";

export function codeKeyboard() {
	return new InlineKeyboard().text("Сгенерировать", "generate").row().text("Без кода", "without");
}
