import { getCurrentDay } from '../packages/Date';

export const parseDate = (
	date: number | string,
	currentDay = getCurrentDay(),
): number => {
	if (date === 'Сегодня') {
		return currentDay;
	} else if (date === 'Вчера') {
		return currentDay - 1;
	} else {
		return typeof date == 'string' ? parseInt(date) : date;
	}
};
