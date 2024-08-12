import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function linkKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
