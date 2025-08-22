function getHouseholdsOnFloor(floor: number) {
  return fetch(`${import.meta.env.VITE_DI_API_URL}`);
}

export default getHouseholdsOnFloor;
