
// What is Discriminated Unions?
// Discriminated unions are a pattern in TypeScript that allows you to create complex types by combining simpler types.

import {Text} from "react-native";
import React from "react";

type NetworkStatus =
    | { type: 'loading' }
    | { type: 'success'; data: any }
    | { type: 'error'; error: string };

const networkStatus: NetworkStatus = { type: 'loading' };

// Discriminated unions are useful when you have a type that can be one of several different types, and you want to be able to tell which type it is at runtime.

const getNetworkStatusMessage = (status: NetworkStatus): string => {
    switch (status.type) {
        case 'loading':
            return 'Loading...';
        case 'success':
            return 'Success!';
        case 'error':
            return `Error: ${status.error}`;
    }
}

console.log(getNetworkStatusMessage(networkStatus)); // Output: Loading...

// Discriminated unions are a powerful feature of TypeScript that can help you create more robust and type-safe code.

// Discriminated unions are a pattern in TypeScript that allows you to create complex types by combining simpler types.
const DiscriminatedUnions:React.FC<{networkStatus:NetworkStatus}> = (props) => {

    switch (props.networkStatus.type) {
        case 'loading':
            return <Text>Loading...</Text>;
        case 'success':
            return <Text>Success!</Text>;

        case 'error':
            return <Text>Error: {props.networkStatus.error}</Text>;

    }

}


const translatedText  = (networkStatus: NetworkStatus) => {
    switch (networkStatus.type) {
        case 'loading':
            return 'Loading...';
        case 'success':
            return 'Success!';
        case 'error':
            return `Error: ${networkStatus.error}`;
    }
}
