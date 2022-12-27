import { DateTime } from 'luxon';

export const getDT = () => DateTime.now().setZone('Europe/Moscow');

export const getCurrentDay = () => {
	return getDT().day;
};
