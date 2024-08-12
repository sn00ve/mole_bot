import { InlineKeyboard } from "grammy";
import { CONTACTS, isSNW, isRUB, isBTC, isDeposit, isWithdraw } from "../constants/index.js";
import { createButtons, withSkipButton } from "./utils.js";

export function contactKeyboard(conversation) {
	const { operator, direction, currency } = conversation.session;

	const contactList = [];

	if (isSNW(operator)) {
		if (isDeposit(direction) && isBTC(currency)) {
			contactList.push(CONTACTS.DSPT);
		}

		if (!isRUB(currency)) {
			contactList.push(CONTACTS.GZPRM);
		}
	} else {
		if (isWithdraw(direction)) {
			if (isRUB(currency)) {
				contactList.push(CONTACTS.DSPT);
			}

			contactList.push(CONTACTS.CRPTX);
		}
	}

	return withSkipButton(InlineKeyboard.from(createButtons(contactList)));
}
