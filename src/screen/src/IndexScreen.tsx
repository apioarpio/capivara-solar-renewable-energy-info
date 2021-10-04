import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import InsidenceChart from '../../components/charts/InsidenceChart';
import {useTranslate} from '../../context-providers/translate.context';
import {dailyinfo} from '../../services/Dailyinfo';
import Geolocation from 'react-native-geolocation-service';
import AreaCloudChart from '../../components/charts/AreaChart';

const IndexScreen = () => {
  const {dictionary} = useTranslate();
  const [data, setData] = useState<Array<number>>([]);
  const [cloudData, setCloudData] = useState<Array<number>>([]);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [cloudLabels, setCloudLabels] = useState<Array<string>>([]);
  const [unit, setUnit] = useState('');
  const [cloudUnit, setCloudUnit] = useState('');

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLabel, setLoadingLabel] = useState<string>('');

  const handleGetCurrentPosition = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position);
          resolve();
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          reject();
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  const handleGetPosition = async () => {
    try {
      setLoading(true);
      setLoadingLabel(dictionary.gettingPosition);
      if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse');
        await handleGetCurrentPosition();
      } else {
        await handleGetCurrentPosition();
      }
      setLoadingLabel(dictionary.buildingChart);
      await handleSolarInfo();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSolarInfo = async () => {
    try {
      const value = await dailyinfo(latitude, longitude);

      //@ts-ignore
      const allsky: any = value.data.properties.parameter.ALLSKY_SFC_SW_DWN;
      //@ts-ignore
      const keys: Array<string> = Object.keys(allsky);

      //@ts-ignore
      const cloud: any = value.data.properties.parameter.CLOUD_AMT;
      const cloudKeys: Array<string> = Object.keys(cloud);

      //@ts-ignore
      setUnit(value.data.parameters.ALLSKY_SFC_SW_DWN.units);
      //@ts-ignore
      setCloudUnit(value.data.parameters.CLOUD_AMT.units);

      let dat: number[] = [];
      let datCloud: number[] = [];
      let lab: string[] = [];
      let labCloud: string[] = [];

      keys.forEach(k => {
        dat.push(allsky[k]);
        lab.push(k);
      });

      cloudKeys.forEach(k => {
        datCloud.push(cloud[k]);
        labCloud.push(k);
      });

      setData(dat);
      setLabels(lab);

      setCloudData(datCloud);
      setCloudLabels(labCloud);
    } catch (e) {
      console.log(e);
      console.log('Error when get data');
    }
  };

  useEffect(() => {
    handleSolarInfo();
  }, []);

  return (
    <ScrollView>
      <HeaderComponent />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.buttonStyles}>
          <Button
            title={dictionary.getCurrentPosition}
            color={'#FEFEFE'}
            onPress={() => handleGetPosition()}
          />
        </View>
        <View style={styles.buttonStyles}>
          <Button
            title={dictionary.getOtherPosition}
            color={'#FEFEFE'}
            onPress={() => {}}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#ffbc28" size={'large'} />
          <Text>{loadingLabel}</Text>
        </View>
      ) : (
        <View style={{marginTop: 20}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 15}}>
              {dictionary.chartIrradianceTitle}
            </Text>
            <Text style={{fontSize: 10}}>{unit}</Text>
          </View>
          <InsidenceChart data={data} labels={labels} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 15}}>{dictionary.cloudAmount}</Text>
            <Text style={{fontSize: 10}}>{cloudUnit}</Text>
          </View>
          <AreaCloudChart data={cloudData} labels={cloudLabels} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: '#ffbc28',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 15,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IndexScreen;
