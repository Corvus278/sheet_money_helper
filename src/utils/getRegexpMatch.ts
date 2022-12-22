export const getRegexpMatch = (str: string, regexp: RegExp): string | null => {
	const matches = str.match(regexp);

	if (!matches) return null;

	if (typeof matches === 'object') {
		return matches.join('');
	} else return matches;
};
