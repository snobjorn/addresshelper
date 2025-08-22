export async function getStreetCollections(street: string) {
  const url = `${
    import.meta.env.VITE_DI_API_URL
  }streetSearch/${encodeURIComponent(street)}?apiKey=${
    import.meta.env.VITE_DI_API_KEY
  }`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        referer: import.meta.env.VITE_DI_REFERER,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch street collections");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching street collections:", error);
  }
}
