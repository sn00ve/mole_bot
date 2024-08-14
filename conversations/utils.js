export async function waitAnswer(conversation, ctx) {
	ctx = await conversation.wait();

	let value;

	if (ctx.callbackQuery?.message) {
		value = ctx.callbackQuery.data;
	}

	if (ctx.message?.text) {
		value = ctx.message.text;

		await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
	}

	return value;
}
