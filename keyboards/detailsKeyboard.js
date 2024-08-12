import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function detailsKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
