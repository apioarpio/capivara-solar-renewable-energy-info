import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import InsidenceChart from '../../components/charts/InsidenceChart';
import {useTranslate} from '../../context-providers/translate.context';
import {dailyinfo} from '../../services/Dailyinfo';
import Geolocation from 'react-native-geolocation-service';

const IndexScreen = () => {
  const {dictionary} = useTranslate();
  const [data, setData] = useState<Array<number>>([]);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [unit, setUnit] = useState('');

  const handleGetCurrantPosition = () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const handleSolarInfo = () => {};

  useEffect(() => {
    dailyinfo()
      .then(value => {
        //@ts-ignore
        const allsky: any = value.data.properties.parameter.ALLSKY_SFC_SW_DWN;
        //@ts-ignore
        setUnit(value.data.parameters.ALLSKY_SFC_SW_DWN.units);
        const keys: Array<string> = Object.keys(allsky);

        let dat: number[] = [];
        let lab: string[] = [];

        keys.forEach(k => {
          dat.push(allsky[k]);
          lab.push(k);
        });

        setData(dat);
        setLabels(lab);
      })
      .catch(e => {
        console.log(e);
        console.log('Error when get data');
      });
  }, []);

  return (
    <View>
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
            onPress={() => {}}
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

      <View style={{marginTop: 20}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 15}}>{dictionary.chartIrradianceTitle}</Text>
          <Text style={{fontSize: 10}}>{unit}</Text>
        </View>
        <InsidenceChart data={data} labels={labels} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: '#ffbc28',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 15,
  },
});

export default IndexScreen;
