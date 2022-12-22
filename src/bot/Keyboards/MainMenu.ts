import { Markup } from 'telegraf';
import { CALCULATE_EXPENSES } from '../actions';

export const mainMenu = () => {
	return Markup.inlineKeyboard([
		Markup.button.callback('Внести расходы', CALCULATE_EXPENSES),
	]);
};
