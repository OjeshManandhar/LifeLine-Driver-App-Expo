import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// component
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import cross from 'assets/images/cross.png';

// global
import { SearchBoxText } from 'global/strings';

// styles
import styles from './styles';

function SearchBox(props) {
  const [text, setText] = useState(props.searchKeyword);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder={SearchBoxText.placeholder}
        value={text}
        returnKeyType='search'
        onChangeText={text => {
          setText(text);
          props.setSearchKeyword(text);
        }}
        onFocus={props.onFocus}
        onSubmitEditing={() => props.setSearchKeyword(text)}
      />

      <AnimatedImageButton
        in={text.length > 0}
        image={cross}
        timeout={0.25 * 1000}
        imageStyles={styles.crossIcon}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => {
          setText('');
          props.setSearchKeyword('');
        }}
      />
    </View>
  );
}

export default SearchBox;
