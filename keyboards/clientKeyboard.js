import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function clientKeyboard() {
	return withSkipButton(new InlineKeyboard().text("Контакт", "matchContact").row());
}
