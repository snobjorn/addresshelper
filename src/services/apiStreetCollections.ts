function getStreetCollections() {
  return fetch(`${import.meta.env.VITE_DI_API_URL}`);
}

export default getStreetCollections;
