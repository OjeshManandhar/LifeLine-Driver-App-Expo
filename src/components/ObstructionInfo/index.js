import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import cross from 'asstes/images/cross.png';

// styles
import styles from './styles';

function ObstructionInfo({ show, onClose, selectedObstruction }) {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.placeName} numberOfLines={1}>
            {selectedObstruction.properties.name}
          </Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <Image source={cross} style={styles.cross} />
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.placeLocation} numberOfLines={1}>
          {selectedObstruction.properties.location}
        </Text>

        <Text style={styles.description} numberOfLines={1}>
          {selectedObstruction.properties.description}
        </Text>
      </View>
    </AnimatedView>
  );
}

ObstructionInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default ObstructionInfo;
