import React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// styles
import styles, { ContainerHeight } from './styles';

function RouteInfo({
  // in, /* Doesnot work, shows problem os use it as props.in */
  onUse,
  onClose,
  location,
  routeInfo,
  useButton,
  ...props
}) {
  return <Text>RouteInfo</Text>;
}

RouteInfo.propTypes = {
  in: PropTypes.bool.isRequired
};

export default RouteInfo;
