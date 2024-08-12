import { InlineKeyboard } from "grammy";

export function startKeyboard() {
	return new InlineKeyboard().text("Заявка", "createOrder").row().text("Расчет", "createSummary");
}
