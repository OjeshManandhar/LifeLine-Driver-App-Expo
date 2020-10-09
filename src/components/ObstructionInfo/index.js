import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';

// styles
import styles from './styles';

function ObstructionInfo({ show }) {
  return (
    <View>
      <Text>Obstruction Info</Text>
    </View>
  );
}

ObstructionInfo.propTypes = {
  in: PropTypes.bool.isRequired
};

export default ObstructionInfo;
