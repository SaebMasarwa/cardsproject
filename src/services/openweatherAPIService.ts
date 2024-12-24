import axios from "axios";

const api: string = `${process.env.REACT_APP_OPENWEATHER_API}`;

export async function getGeolocationByCity(city: string) {
  try {
    const res = await axios.get(
      `${api}q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );
    console.log("Geolocation by city: " + res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
