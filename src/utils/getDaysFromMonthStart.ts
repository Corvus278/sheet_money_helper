export const getDaysFromMonthStart = (): TDayItem[] => {
	const days: TDayItem[] = [];
	const currentDay = new Date().getDate();

	let day = 1;
	let end: boolean = false;

	while (!end) {
		if (day >= currentDay) {
			days.push('Сегодня');
			end = true;
		} else if (day === currentDay - 1) {
			days.push('Вчера');
		} else {
			days.push(day);
		}

		day++;
	}

	return days;
};

type TDayItem = number | 'Сегодня' | 'Вчера';
