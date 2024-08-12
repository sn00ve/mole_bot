import { InlineKeyboard } from "grammy";
import { withSkipButton } from "./utils.js";
import { MATCH_CONTACT } from "../constants/index.js";

export function clientKeyboard() {
	return withSkipButton(new InlineKeyboard().text("Контакт", MATCH_CONTACT).row());
}
