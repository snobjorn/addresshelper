export async function getStreetNumbersForCollection(streetId: number) {
  const url = `${
    import.meta.env.VITE_DI_API_URL
  }streetNumberSearch/${streetId}?apiKey=${import.meta.env.VITE_DI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        referer: import.meta.env.VITE_DI_REFERER,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch street numbers");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching street numbers:", error);
  }
}
