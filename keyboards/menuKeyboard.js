import { InlineKeyboard } from "grammy";

export function menuKeyboard() {
    return new InlineKeyboard().text("Заявка", "createOrder").row().text("Отчет", "sendReport");
}
