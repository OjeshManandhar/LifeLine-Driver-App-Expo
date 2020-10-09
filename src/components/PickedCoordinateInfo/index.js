import React, { useState, useEffect } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// utils
import reverseGeocoder from 'utils/reverseGeocoder';

// global
import { PickedCoordinateInfoText } from 'global/strings';

// assets
import finish from 'assets/images/finish.png';

// styles
import styles, { containerHeight } from './styles';

function PickedCoordinateInfo({ show, onUse, pickedCoordinate }) {
  const [findingInfo, setFindingInfo] = useState(true);
  const [pickedLocation, setPickedLocation] = useState(null);

  useEffect(() => {
    setPickedLocation(null);
    setFindingInfo(true);

    //reverseGeocode
    pickedCoordinate &&
      reverseGeocoder(pickedCoordinate)
        .then(result => {
          setPickedLocation(result);
          setFindingInfo(false);
        })
        .catch(error => console.log('error:', error));
  }, [setFindingInfo, setPickedLocation, pickedCoordinate]);

  return (
    <AnimatedView
      in={show}
      timeout={0.5 * 1000}
      viewStyles={styles.mainContainer}
      animationStyles={{
        appear: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        enter: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        exit: {
          opacity: [1, 0],
          bottom: [5, -containerHeight]
        }
      }}
    >
      {findingInfo && !pickedLocation ? (
        <View style={styles.container}>
          <Text style={styles.loading} numberOfLines={1}>
            {PickedCoordinateInfoText.loading}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName} numberOfLines={1}>
              {pickedLocation.name}
            </Text>
            <Text style={styles.placeLocation} numberOfLines={1}>
              {pickedLocation.location}
            </Text>
          </View>
          <TouchableNativeFeedback onPress={() => onUse(pickedLocation)}>
            <View style={styles.pickButton}>
              <Image source={finish} style={styles.pickIcon} />
              <Text style={styles.pickText}>
                {PickedCoordinateInfoText.pickText}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </AnimatedView>
  );
}

PickedCoordinateInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default PickedCoordinateInfo;
