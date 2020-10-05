import React from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import { Avatar, Button, Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import avatar from 'assets/images/account/dead.png';

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
        <Avatar.Image style={styles.avatar} source={avatar} size={130} />

        <Divider style={styles.divider} />

        <TouchableWithoutFeedback onPress={props.mapView}>
          <Icon
            name='close'
            size={35}
            color={Colors.borderGrey}
            style={styles.backIcon}
          />
        </TouchableWithoutFeedback>

        <View style={styles.userInfoContainer}>
          {/* <Text style={styles.infoTitle}>Account Information</Text> */}
          <View style={styles.rowContainer}>
            <Text style={styles.label}>User Name</Text>
            <Text style={styles.userName}>ABC Dummy</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Contact Number</Text>

            <Text style={styles.phoneNumber}>9808000111</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={styles.accountType}>
              {AccountText.accountType.driver}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            icon='phone'
            size={25}
            color={Colors.primary}
            onPress={() => console.log('call')}
            style={styles.callButton}
          />

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
      </View>
    </AnimatedView>
  );
}

AccountView.propTypes = {
  in: PropTypes.bool.isRequired
};

export default AccountView;
