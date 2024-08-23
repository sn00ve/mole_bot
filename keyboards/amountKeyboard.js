import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function amountKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
