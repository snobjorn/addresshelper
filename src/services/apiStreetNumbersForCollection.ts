function getStreetNumbersForCollection() {
  return fetch(`${import.meta.env.VITE_DI_API_URL}`);
}

export default getStreetNumbersForCollection;
