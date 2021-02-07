import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import Axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import { Avatar, Button, Divider, IconButton } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import noImage from 'assets/images/noImage.jpg';

// utils
import UserInfo from 'utils/userInfo';

// global
import Colors from 'global/colors';
import { AccountViewText } from 'global/strings';

// styles
import styles from './styles';

// env
import { API_URL, DRIVER_IMAGE_ENDPOINT } from '@env';

const dummyAcc = {
  name: 'DeadSkull',
  contact: '9863198269',
  role: 'driver'
};

function AccountView(props) {
  console.log('props:', props);

  const [loading, setLoading] = useState(true);
  const [accImage, setAccImage] = useState(null);
  const [accInfo, setAccInfo] = useState(dummyAcc);

  // Account Info
  useEffect(() => {
    async function getInfo() {
      if (accountId) {
        // perform acios request for image and image
      } else {
        const info = UserInfo.getInfo();

        setAccInfo(info);
        setAccImage(`${API_URL}${DRIVER_IMAGE_ENDPOINT}/${info.contact}`);
      }
    }

    setLoading(true);

    getInfo();
  }, [setAccInfo, setLoading, setAccImage, props.accountId]);

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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.container}>
          <Avatar.Image
            style={styles.avatar}
            source={
              accImage
                ? {
                    uri: accImage
                  }
                : noImage
            }
            size={130}
          />

          <Divider style={styles.divider} />

          <TouchableWithoutFeedback onPress={props.mapView}>
            <Icon
              name='close'
              size={35}
              color={Colors.greyBorder}
              style={styles.backIcon}
            />
          </TouchableWithoutFeedback>

          <View style={styles.userInfoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.name}</Text>
              <Text>{accInfo.name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.contact}</Text>
              <Text>{accInfo.contact}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.role}</Text>
              <Text>{AccountViewText.accountType[accInfo.role]}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {props.accountId ? (
              <Button
                icon='logout'
                mode='outlined'
                color={Colors.primary}
                style={styles.logOutButton}
                contentStyle={styles.logOutButtonContent}
                onPress={props.logout}
              >
                <Text style={styles.logOutButtonContent}>
                  {AccountViewText.button}
                </Text>
              </Button>
            ) : (
              <IconButton
                icon='phone'
                size={25}
                color={Colors.primary}
                onPress={() => console.log('call')}
                style={styles.callButton}
              />
            )}
          </View>
        </View>
      )}
    </AnimatedView>
  );
}

AccountView.propTypes = {
  in: PropTypes.bool.isRequired
};

export default AccountView;
