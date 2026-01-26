


import axios from "axios";
import { GOOGLE_MAP_API } from "./config.js";
// import { updateUserLocation } from "./authServices.js";
// import { updateUser } from "../../Server/controllers/auth/UpdateUser.js";
import { Updateduserlocation } from "./authServices.js";

export const reverseGeocode = async (
  latitude,
  longitude,
  setUser,
  user
) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API}`;
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const address = response.data.results[0]?.formatted_address || "Unknown Address";
      console.log("reverse geocode....",user);
      
      const updateduserdata= await Updateduserlocation(user._id,{ liveLocation: { latitude, longitude }, address });
      if (updateduserdata && updateduserdata._id) {
        console.log("Setting user to updated data:", updateduserdata);
        setUser(updateduserdata);
      } else {
        console.error("Updated user data is invalid", updateduserdata);
      }
    } else {
      console.error("Geo Code Failed", response.data);
    }
  } catch (error) {
    console.error("Geo Code Failed", error);
  }
};
