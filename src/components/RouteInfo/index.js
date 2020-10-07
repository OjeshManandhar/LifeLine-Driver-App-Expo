import React, { useState } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

// packages
import { Divider, TextInput } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

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
          <TouchableNativeFeedback onPress={onClose}>
            <Image source={cross} style={styles.cross} />
          </TouchableNativeFeedback>
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
          label="Patient's condition"
          placeholder="Patient's condition"
          value={description}
          onChangeText={text => setDescription(text)}
          onBlur={() => console.log('Blur from description')}
        />

        <View style={styles.footer}></View>
      </View>
    </AnimatedView>
  );
}

RouteInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default RouteInfo;
