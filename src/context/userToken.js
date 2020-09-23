import React from 'react';

const UserTokenContext = React.createContext(null);

const Provider = UserTokenContext.Provider;
const Consumer = UserTokenContext.Consumer;

export { UserTokenContext, Provider, Consumer };
