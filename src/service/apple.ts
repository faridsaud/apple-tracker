import axios from "axios";

export enum iPhoneModels {
  "13ProMaxGraphite128GB" = "MLKL3LL/A",
  "13ProMaxGraphite256GB" = "MLKR3LL/A",
  "13ProMaxGold128GB" = "MLKN3LL/A",
  "13ProMaxGold256GB" = "MLKU3LL/A",
  "13ProMaxSilver128GB" = "MLKM3LL/A",
  "13ProMaxSilver256GB" = "MLKT3LL/A",
  "13ProMaxSierra128GB" = "MLKP3LL/A",
  "13ProMaxSierra256GB" = "MLKV3LL/A",
}

export enum MacbookModels {
  "16ProBase" = "MK1E3LL/A",
}

const checkAvailabilityInResponse = (data: any): boolean => {
  const {
    body: {
      content: { pickupMessage },
    },
  } = data;
  return !!pickupMessage.stores.find((store) => {
    let isAvailable = false;
    Object.keys(store.partsAvailability).forEach((part) => {
      if (store.partsAvailability[part].pickupDisplay !== "unavailable") {
        isAvailable = true;
      }
    });
    return isAvailable;
  });
};

export const isIPhoneAvailable = async (zip: string): boolean => {
  try {
    const modelParams = {};
    Object.keys(iPhoneModels).forEach((key, index) => {
      modelParams[`parts.${index}`] = iPhoneModels[key];
    });
    const { data } = await axios.get(
      "https://www.apple.com/shop/fulfillment-messages",
      {
        params: {
          pl: true,
          mt: "compact",
          cppart: "UNLOCKED/US",
          location: zip,
          ...modelParams,
        },
      }
    );
    console.log({ data });
    return checkAvailabilityInResponse(data);
  } catch (e) {
    return false;
  }
};
