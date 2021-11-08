import axios from "axios";

export enum Device {
  "IPHONE" = "IPHONE",
  "MACBOOK" = "MACBOOK",
}

export enum IPhoneModels {
  "13_PRO_MAX_GRAPHITE_128GB" = "MLKL3LL/A",
  "13_PRO_MAX_GRAPHITE_256GB" = "MLKR3LL/A",
  "13_PRO_MAX_GOLD_128GB" = "MLKN3LL/A",
  "13_PRO_MAX_GOLD_256GB" = "MLKU3LL/A",
  "13_PRO_MAX_SILVER_128GB" = "MLKM3LL/A",
  "13_PRO_MAX_SILVER_256GB" = "MLKT3LL/A",
  "13_PRO_MAX_SIERRA_128GB" = "MLKP3LL/A",
  "13_PRO_MAX_SIERRA_256GB" = "MLKV3LL/A",
}

export enum MacbookModels {
  "16_PRO_BASE_SILVER" = "MK1E3LL/A",
  "16_PRO_BASE_GREY" = "MK183LL/A",
}

const checkAvailabilityInResponse = (data: any): boolean => {
  const {
    body: {
      content: { pickupMessage },
    },
  } = data;
  return !!pickupMessage.stores
    .filter((store) => store.storedistance < 100)
    .find((store) => {
      let isAvailable = false;
      Object.keys(store.partsAvailability).forEach((part) => {
        if (store.partsAvailability[part].pickupDisplay !== "unavailable") {
          isAvailable = true;
        }
      });
      return isAvailable;
    });
};

export const isDeviceAvailable = async (
  zip: string,
  device: Device
): boolean => {
  try {
    const modelParams = {};
    const models = device === Device.IPHONE ? IPhoneModels : MacbookModels;
    Object.keys(models).forEach((key, index) => {
      modelParams[`parts.${index}`] = models[key];
    });
    const { data } = await axios.get(
      "https://www.apple.com/shop/fulfillment-messages",
      {
        params: {
          pl: device === Device.IPHONE ? true : undefined,
          mt: device === Device.IPHONE ? "compact" : "regular",
          cppart: device === Device.IPHONE ? "UNLOCKED/US" : undefined,
          location: zip,
          ...modelParams,
        },
      }
    );
    return checkAvailabilityInResponse(data);
  } catch (e) {
    console.log(e);
    return false;
  }
};
