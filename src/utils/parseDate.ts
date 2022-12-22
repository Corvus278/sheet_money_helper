import { TSelectDate } from '../bot/types';

export const parseDate = (
	date: number | string,
	currentDate = new Date(),
): number => {
	if (date === 'Сегодня') {
		return currentDate.getDate();
	} else if (date === 'Вчера') {
		return currentDate.getDate() - 1;
	} else {
		return typeof date == 'string' ? parseInt(date) : date;
	}
};
