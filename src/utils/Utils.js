
export const pick = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const pickWithIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return [array[randomIndex], randomIndex];
}

export const chance = (odds) => {
  return pick(new Array(odds - 1).fill(null).map((value, index) => index)) === 0
}