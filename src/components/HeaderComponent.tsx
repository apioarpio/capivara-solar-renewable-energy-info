import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BrazilSVGFlag, USASVGFlag} from '../assets/svg/SVGFlags';
import {useTranslate} from '../context-providers/translate.context';

const dimensions = Dimensions.get('window');

const HeaderComponent = () => {
  const {setLanguage} = useTranslate();
  return (
    <View style={{alignItems: 'center', alignContent: 'center'}}>
      <View style={{marginTop: 50, flexDirection: 'row'}}>
        <SvgXml
          onPress={() => setLanguage('EN')}
          xml={USASVGFlag}
          width={30}
          height={30}
          style={{marginRight: 10}}
        />
        <SvgXml
          onPress={() => setLanguage('PT')}
          xml={BrazilSVGFlag}
          width={30}
          height={30}
        />
      </View>
      <Text style={{fontSize: 30, marginTop: dimensions.height * 0.01}}>
        Capivara Solar
      </Text>
    </View>
  );
};

export default HeaderComponent;
