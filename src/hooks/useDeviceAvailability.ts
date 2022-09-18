import {
  Device,
  isDeviceAvailable as fetchDeviceAvailability,
} from "../service/apple";
import { useCallback, useEffect, useState } from "react";

export const useDeviceAvailability = (
  zip: string,
  device: Device
): [boolean, Date] => {
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [isDeviceAvailable, setDeviceAvailable] = useState<boolean>(false);

  const checkDeviceAvailability = useCallback(async () => {
    const isAvailable = await fetchDeviceAvailability(zip, device);
    setDeviceAvailable(isAvailable);
    setTimestamp(new Date());
  }, [zip]);

  useEffect(() => {
    const iId = setInterval(() => {
      checkDeviceAvailability();
    }, 10 * 1000);
    return () => {
      clearInterval(iId);
    };
  }, [checkDeviceAvailability]);

  return [isDeviceAvailable, timestamp];
};
