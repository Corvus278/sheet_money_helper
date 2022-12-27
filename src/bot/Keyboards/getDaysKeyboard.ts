import { getDaysFromMonthStart } from '../../utils/getDaysFromMonthStart';
import { parseDate } from '../../utils/parseDate';
import { createKeyboard } from './createKeyboard';

export const getDaysKeyboard = () =>
	createKeyboard(
		getDaysFromMonthStart().map((day) => ({
			content: day.toString(),
			action: `selectDate-${parseDate(day)}`,
		})),
		7,
	);
