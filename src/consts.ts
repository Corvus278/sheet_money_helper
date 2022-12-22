import { getEnv } from './utils/getEnv';
require('dotenv').config();

export const GOOGLE_SHEET_ID = getEnv('GOOGLE_SHEET_ID');
export const GOOGLE_SERVICE_ACCOUNT_KEY = getEnv(
	'GOOGLE_SERVICE_ACCOUNT_KEY',
).replace(/\\n/g, '\n');
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = getEnv(
	'GOOGLE_SERVICE_ACCOUNT_EMAIL',
);

export const USER_CHAT_TG_ID = parseInt(getEnv('USER_CHAT_TG_ID'));

export const IDI_NA_HYI_PHOTO_URL =
	'https://memepedia.ru/wp-content/uploads/2018/01/%D0%B2%D1%8B-%D0%BA%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%B8%D0%B5-%D1%8F-%D0%B2%D0%B0%D1%81-%D0%BD%D0%B5-%D0%B7%D0%B2%D0%B0%D0%BB-1.png';
