import React, { useState } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

// packages
import Slider from '@react-native-community/slider';
import { Divider, TextInput } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// global
import { RouteInfoText } from 'global/strings';

// assets
import cross from 'assets/images/cross.png';

// styles
import styles, { ContainerHeight } from './styles';

function RouteInfo({
  // in, /* Doesnot work, shows problem os use it as in */
  show,
  onUse,
  route,
  onClose,
  location,
  useButton
}) {
  // useEffect(() => {}, []);
  const [description, setDescription] = useState('');

  function distanceToString(distance) {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`;
    } else {
      return `${parseInt(distance, 10)} m`;
    }
  }

  function timeToString(time) {
    const hours = parseInt(time / 3600, 10);
    const minutes = parseInt(time / 60 - hours * 60, 10);
    const seconds = parseInt(time - minutes * 60 - hours * 60 * 60, 10);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    } else {
      return `${seconds} sec`;
    }
  }

  if (!location || !route) return <></>;

  return (
    <AnimatedView
      in={show}
      timeout={0.5 * 1000}
      viewStyles={styles.mainContainer}
      animationStyles={{
        appear: {
          opacity: [0, 1],
          bottom: [-ContainerHeight, 5]
        },
        enter: {
          opacity: [0, 1],
          bottom: [-ContainerHeight, 5]
        },
        exit: {
          opacity: [1, 0],
          bottom: [5, -ContainerHeight]
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.placeName} numberOfLines={1}>
            {location.name}
          </Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <Image source={cross} style={styles.cross} />
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.placeLocation} numberOfLines={1}>
          {location.location}
        </Text>

        <Text style={styles.routeText}>
          {timeToString(route.properties.duration)} (
          {distanceToString(route.properties.distance)})
        </Text>

        <Divider style={styles.divider} />

        <TextInput
          mode='flat'
          dense={true}
          multiline={false}
          numberOfLine={1}
          returnKeyType='done'
          style={styles.description}
          label={RouteInfoText.description}
          placeholder={RouteInfoText.description}
          value={description}
          onChangeText={text => setDescription(text)}
          onBlur={() => console.log('Blur from description')}
        />

        <View style={styles.footer}>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>{RouteInfoText.slider}</Text>

            <Slider
              style={styles.slider}
              step={1}
              minimumValue={1}
              maximumValue={3}
              thumbTintColor='blue'
              minimumTrackTintColor='#FF0000'
              maximumTrackTintColor='#000000'
            />
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              console.log('onUse');
              // onUse();
            }}
          >
            <View style={styles.useButton}>
              <Image source={useButton.image} style={styles.useIcon} />
              <Text style={styles.useText}>
                {RouteInfoText[useButton.text]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </AnimatedView>
  );
}

RouteInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default RouteInfo;
