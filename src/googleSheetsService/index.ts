import { GoogleSpreadsheet } from 'google-spreadsheet';
import {
	GOOGLE_SHEET_ID,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_SERVICE_ACCOUNT_KEY,
} from '../consts';
import { GoogleSheetsService } from './googleSheetService';

let isReady = false;

const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
const googleSheetsService = new GoogleSheetsService({ doc });

export const getGoogleService = async () => {
	if (isReady) {
		return googleSheetsService;
	} else {
		// Auth
		await doc.useServiceAccountAuth({
			client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: GOOGLE_SERVICE_ACCOUNT_KEY,
		});

		// Load document
		await doc.loadInfo();

		isReady = true;
		return googleSheetsService;
	}
};
