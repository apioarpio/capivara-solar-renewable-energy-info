import axios from 'axios';

export const dailyinfo = (latitude: number, longitude: number) => {
  const lat = latitude;
  const long = longitude;
  const startDay = 20200101;
  const endDay = 20200130;

  return axios.get(
    `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PS,CLRSKY_SFC_SW_DWN,CLOUD_AMT,ALLSKY_SFC_SW_DWN&community=RE&longitude=${long}&latitude=${lat}&start=${startDay}&end=${endDay}&format=JSON`,
  );
};
