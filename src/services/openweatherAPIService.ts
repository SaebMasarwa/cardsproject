import axios from "axios";

const api: string = process.env.REACT_APP_OPENWEATHER_API as string;
const apiKey: string = process.env.REACT_APP_OPENWEATHER_API_KEY as string;

export async function getGeolocationByCity(city: string) {
  try {
    const res = await axios.get(`${api}q=${city}&appid=${apiKey}`);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
