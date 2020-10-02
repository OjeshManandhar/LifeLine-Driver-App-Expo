import React from 'react';
import { Text as T } from 'react-native';

// global
import { WorkSansRegular } from 'global/styles';

function Text({ style, children, ...props }) {
  return (
    <T style={[style, WorkSansRegular]} {...props}>
      {children}
    </T>
  );
}

export default Text;
