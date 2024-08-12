import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function rateKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
