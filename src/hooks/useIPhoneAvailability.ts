import { isIPhoneAvailable as fetchIPhoneAvailability } from "../service/apple";
import { useCallback, useEffect, useState } from "react";

export const useIPhoneAvailability = (zip: string): [boolean, Date] => {
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [isIPhoneAvailable, setIPhoneAvailable] = useState<boolean>(false);

  const checkIPhoneAvailability = useCallback(async () => {
    const isAvailable = await fetchIPhoneAvailability(zip);
    setIPhoneAvailable(isAvailable);
    setTimestamp(new Date());
  }, [zip]);

  useEffect(() => {
    const iId = setInterval(() => {
      checkIPhoneAvailability();
    }, 10 * 1000);
    return () => {
      clearInterval(iId);
    };
  }, [checkIPhoneAvailability]);

  return [isIPhoneAvailable, timestamp];
};
