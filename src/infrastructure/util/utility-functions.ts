import { ConflictException } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';

export const checkExistingPermissions = (
  existingArray: any[],
  newArray: any[],
): Promise<void> => {
  const intersection = existingArray.filter((element) =>
    newArray.includes(element),
  );

  console.log('intersection', intersection);

  if (intersection.length > 0)
    throw new ConflictException(`Already Exists ${intersection.toString()}`);
  return;
};

export const axiosPostRequest: any = async (url, dataObj, token) => {
  const { data } = await axios.post(url, dataObj, {
    headers: {
      'X-AUTH-TOKEN': token,
      'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  return data;
};

export const axiosRequest = {
  postRequest: (url, dataObj, token) => axiosPostRequest(url, dataObj, token),
};
