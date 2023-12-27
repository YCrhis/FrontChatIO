export const currentDay = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedDate;
};

export function getCurrentTimeAsNumber() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

  const timeNumber = parseInt(
    `${hours}${minutes}${seconds}${milliseconds}`,
    10
  );
  return timeNumber;
}
