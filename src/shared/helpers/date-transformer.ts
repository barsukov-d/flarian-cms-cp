export const dateTransformer = (isoDate: string) => {
	const date = new Date(isoDate);

	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

	return formattedDate;
};
