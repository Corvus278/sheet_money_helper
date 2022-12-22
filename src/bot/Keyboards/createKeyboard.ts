import { Markup } from 'telegraf';

type TKeayboardBotton = {
	content: string;
	action: string;
	hide?: boolean;
};

export const createKeyboard = (
	btns: TKeayboardBotton[],
	columns?: number | undefined,
) => {
	return Markup.inlineKeyboard(
		btns.map((btn) => {
			return Markup.button.callback(btn.content, btn.action, btn.hide || false);
		}),
		{
			columns,
		},
	);
};
