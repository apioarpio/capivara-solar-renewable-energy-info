import React, {useEffect, useState} from 'react';
import * as shape from 'd3-shape';
import {AreaChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {ScrollView, View} from 'react-native';

const contentInset = {top: 20, bottom: 20};

const AreaCloudChart = ({data, labels}: {data: number[]; labels: string[]}) => {
  const [width, setWidth] = useState(0);

  const handleDate = (date: string) => {
    return `${String(date).substr(0, 4)}-${String(date).substr(4, 2)}-${String(
      date,
    ).substr(6, 2)}`;
  };

  useEffect(() => {
    const s: number = data.length / 10;
    setWidth(s * 300);
  }, [data]);

  return (
    <ScrollView horizontal={true}>
      <View style={{width, marginBottom: 20, height: 300}}>
        <View style={{height: 200, flexDirection: 'row', marginLeft: 10}}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
          />
          <AreaChart
            style={{marginLeft: 10, height: 200, width: width}}
            data={data}
            contentInset={{top: 30, bottom: 30}}
            curve={shape.curveNatural}
            svg={{fill: 'rgba(255,219,57,0.5)'}}
          />
          <Grid style={{width: width}} />
        </View>
        <XAxis
          data={data}
          formatLabel={(value: number, index: number) =>
            handleDate(labels[index])
          }
          contentInset={{left: 10, right: 10}}
          style={{height: 100}}
          svg={{
            fontSize: 10,
            fill: 'black',
            fontWeight: 'bold',
            rotation: 90,
            originY: 35,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AreaCloudChart;
