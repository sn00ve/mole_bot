import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function rateСrossKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
