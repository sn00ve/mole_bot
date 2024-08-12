import { InlineKeyboard } from "grammy";

export function optionKeyboard() {
	return new InlineKeyboard().text("Да", "yes").row().text("Нет", "no");
}
