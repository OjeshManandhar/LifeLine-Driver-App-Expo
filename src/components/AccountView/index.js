import React from 'react';
import { Text, Button, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';

// components
import AnimatedView from 'components/AnimatedView';

// styles
import styles from './styles';

function AccountView(props) {
  return (
    <AnimatedView
      in={props.in}
      timeout={1 * 1000}
      viewStyles={styles.container}
      animationStyles={{
        // use the bottom here or the height in styles.container
        enter: {
          opacity: [0, 1],
          top: [useWindowDimensions().height, 0],
          bottom: [-useWindowDimensions().height, 0]
        },
        exit: {
          opacity: [1, 0],
          top: [0, useWindowDimensions().height],
          bottom: [0, -useWindowDimensions().height]
        }
      }}
    >
      <React.Fragment>
        <Text>Account Screen</Text>
        <Button title='Logout' onPress={props.logout} />
      </React.Fragment>
    </AnimatedView>
  );
}

AccountView.propTypes = {
  in: PropTypes.bool.isRequired
};

export default AccountView;
