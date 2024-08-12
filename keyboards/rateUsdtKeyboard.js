import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";

export function rateUsdtKeyboard() {
	return withSkipButton(new InlineKeyboard());
}
