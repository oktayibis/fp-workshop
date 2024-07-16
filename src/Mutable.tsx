import React, { useState } from 'react';
import { Button, View, Text, GestureResponderEvent } from 'react-native';

const ONE = 1;


// we can't say all the time it return same output for same input

// Mutable with object
const mutableObject = (obj: { a: number }) => {
    obj.a = obj.a + ONE;
    return obj;
}
// mutable array
const mutableArray = (arr: number[]) => {
    arr.push(ONE); // push, pop, sort
    return arr;
}

// Immutable fn: It takes input and return new value, it's a pure function
const immutableFn = (arr: number[], newNumber: number) => {
    // arr[7] = 9 // mutation
    return [...arr, newNumber];
}

const initialState = {
    a: 1,
    list: [1, 2, 3]
}

const addOne = () => {
    // Very dengeours and bad practice
    initialState.a = 2 // What if use the state.a in another component and it's changed here, it will cause a bug

    // or
    initialState.list.push(4);
}

const newItemAdded = (state: typeof initialState, newItem: number) => { // Pure function
    return {
        ...state,
        list: immutableFn(state.list, newItem) // Pure function
    }
}

// Mutable Component

// Presentational Component
// Fxe Desgin library usually use Immutable and Pure component

// Why readonly
export const Immutable: React.FC<{ count: number, readonly setCount: (val) => void }> = (props) => {
    props.count = 10; // Run another component and observe change the value

    console.log('Rendering Immutable');

    return (
        <View>
            <Text>Pure Component</Text>
            <Text>Count: {props.count}</Text>
            <Button title="Increment" onPress={() => props.setCount(props.count + 1)} />
        </View>
    );
}

const Mutable = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Mutable Component</h1>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default Mutable;

