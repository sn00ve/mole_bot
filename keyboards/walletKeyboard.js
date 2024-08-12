import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function walletKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
