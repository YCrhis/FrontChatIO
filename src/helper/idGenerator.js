export function generateUniqueRandomNumber() {
  const existingNumbers = new Set();

  while (true) {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generates a random 5-digit number

    if (!existingNumbers.has(randomNumber)) {
      existingNumbers.add(randomNumber);
      return randomNumber.toString();
    }
  }
}
