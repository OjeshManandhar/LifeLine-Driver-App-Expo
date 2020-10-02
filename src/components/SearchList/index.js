import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';
import SearchResult from 'components/SearchResult';

// utils
import forwardGeocoder from 'utils/forwardGeocoder';

// assets
import pickMap from 'assets/images/search/pickMap.png';

// styles
import styles from './styles';

function SearchList(props) {
  const [response, setResponse] = useState([]);

  const renderResponses = useCallback(() => {
    if (props.searchKeyword === '') return null;

    if (response.length === 0) {
      return (
        <View style={styles.searchResultGroup}>
          <View style={[styles.blockContainer, { paddingHorizontal: 20 }]}>
            <Text style={[styles.blockText, { paddingHorizontal: 0 }]}>
              Sorry no results
            </Text>
          </View>
        </View>
      );
    }

    const responseList = response.map((item, index) => (
      <View key={item.id} style={styles.blockContainer}>
        <SearchResult
          data={item}
          last={index === response.length - 1}
          setPickedLocation={props.setPickedLocation}
        />
      </View>
    ));

    return <View style={styles.searchResultGroup}>{responseList}</View>;
  }, [response, props.searchKeyword]);

  useEffect(() => {
    if (props.searchKeyword !== '') {
      forwardGeocoder(props.searchKeyword)
        .then(result => {
          setResponse(result);
          // console.log('SUCESS ', props.searchKeyword + ':', result);
        })
        .catch(error => {
          console.log('SearchList error ', props.searchKeyword + ':', error);
        });
    } else {
      setResponse([]);
    }
  }, [setResponse, props.searchKeyword]);

  return (
    <AnimatedView
      in={props.in}
      timeout={1 * 1000}
      viewStyles={styles.container}
      animationStyles={{
        // use the bottom here or the height in styles in styles.container
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
      <ScrollView keyboardShouldPersistTaps='always'>
        {renderResponses()}

        <TouchableNativeFeedback onPress={props.switchToPicking}>
          <View style={styles.searchResultGroup}>
            <View style={styles.blockContainer}>
              <View style={styles.blockImageContainer}>
                <Image source={pickMap} style={styles.blockImage} />
              </View>
              <Text style={styles.blockText}>Pick a location on map</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </AnimatedView>
  );
}

SearchList.propTypes = {
  in: PropTypes.bool.isRequired
};

export default SearchList;
