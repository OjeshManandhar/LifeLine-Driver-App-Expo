import React from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import { Avatar, Button } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import back from 'assets/images/back.png';
import avatar from 'assets/images/dead.png';

// global
import Colors from 'global/colors';
import { AccountText } from 'global/strings';

// styles
import styles from './styles';

function AccountView(props) {
  return (
    <AnimatedView
      in={props.in}
      timeout={0.5 * 1000}
      viewStyles={styles.viewContainer}
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
      <View style={styles.container}>
        <Avatar.Image style={styles.avatar} source={avatar} size={150} />

        <TouchableWithoutFeedback onPress={props.mapView}>
          <Image source={back} style={styles.backIcon} />
        </TouchableWithoutFeedback>

        <Text style={styles.accountType}>{AccountText.accountType.driver}</Text>

        <Text style={styles.userName}>User Name</Text>

        <Text styles={styles.phoneNumber}>Phone number</Text>

        <Button
          icon='logout'
          mode='outlined'
          color={Colors.primary}
          style={styles.logOutButton}
          contentStyle={styles.logOutButtonContent}
          onPress={props.logout}
        >
          <Text style={styles.logOutButtonContent}>{AccountText.button}</Text>
        </Button>
      </View>
    </AnimatedView>
  );
}

AccountView.propTypes = {
  in: PropTypes.bool.isRequired
};

export default AccountView;
