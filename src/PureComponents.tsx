import React from "react";
import { View, Text, TextInput, Button } from "react-native";

// Pure Component , what' doing react memo

// Let's explain with what is a pure function in FP.

// A pure function is a function that given the same input, will always return the same output and has no side effects.
// So, it's a deterministic function.
// It's a function that only depends on its input and doesn't depend on any external state.
// It doesn't mutate any external state.
// It doesn't have any side effects.
const sum2Numbers = (a: number, b: number) => {
    return a + b;
};
// Another example of a pure function is the Math.max function.
// It will always return the same output given the same input.
const max = Math.max(1, 2, 3, 4, 5);

// In React, a pure component is a component that only depends on its props.

// In here if we use React.memo, it will prevent the re-rendering of the component if the props are the same.
// If the props are different, the component will re-render.
// So that makes the component a pure component because it only depends on the props.
export const LionPureComponent = React.memo<{ readonly lionCount: number }>(
    function MyPureComponent({ lionCount }) {
        console.log("Rendering Lions(Pure)", lionCount);
        return <Text>-Pure-Lions: {lionCount}</Text>;
    }
);

export const RabbitComponentNoMemo = ({ count }: { readonly count: number }) => {
    console.log("Rendering Rabbit:", count);
    return <Text>-Impure-Rabits: {count}</Text>;
};

// Pure component with fnd

export const MyPureComponentWithFnc = React.memo<{
    readonly text: string;
    readonly onAction: (val: string) => void;
}>(function MyPureComponentWithFnc({ text, onAction }) {
    console.log("Rendering MyPureComponentWithFnc");
    // const [text, setText] = React.useState("");


    return (
        <TextInput
            style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
            }}
            onChangeText={onAction}
        >
            {text}
        </TextInput>
    );
});

// Impure function
// An impure function is a function that has side effects.
// Biggest problem with impure functions is that they are not predictable. and they are not testable.
const impureSum2Numbers = (a: number, b: number) => {
    console.log("Impure Function");
    return a + b;
}

const impureMax = () => {
    console.log("Impure Function");
    return Math.max(1, 2, 3, 4, 5);
}

const toFirst2 = (text: string) => {
    return text.substring(0, 2);
}
// Explain here why we should not use any type => what's ZOD doing.
// Very Bad: using any type
const impureInput = (text: any) => {
    const result = toFirst2(text);
    return result;
}


// Impure Component
// An impure component is a component that depends on its state or context.
// It has side effects.
// It mutates external state.
// It depends on external state.

export const ImpureComponent = () => {
    const [count, setCount] = React.useState(0); // state

    // This component is impure because it depends on the state.
    // It has side effects because it mutates the state.
    return (
        <View>
            <Text>Impure Component Count: ${count}</Text>
            <Button title="Increment" onPress={() => setCount((prev) => prev + 1)} />
        </View>
    );
}

// ImPure with state management
// In this example, we are using the useReducer hook to manage the state.
// The useReducer hook is a pure function.

// in the state mangement, actions could be impure
// Actions responsible to fetch data from the server, or to update the state or to do some side effects.

// But the reducer function is a pure function.

const initialState = { count: 0, name: "", age: 0 };

type Action = { type: "increment" } | { type: "decrement" } | { type: "setName", name: string } | { type: "setAge", age: number };

function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + 1 };
        case "decrement":
            return { ...state, count: state.count - 1 };
        case "setName":
            return { ...state, name: action.name };
        case "setAge":
            return { ...state, age: action.age };
        default:
            return state;
    }
}

export const ImpureComponentWithStateManagement = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // This component is impure because it depends on the state.
    // It has side effects because it mutates the state.
    console.log('ImpureComponentWithStateManagement');

    return (
        <View>
            <Text>Impure Component Count: ${state.count}</Text>
            <Button title="Increment" onPress={() => dispatch({ type: "setAge", age: 100 })} />
            <Button title="Decrement" onPress={() => dispatch({ type: "decrement" })} />
            <AgeComponent age={state.age} name={state.name} dispatch={dispatch} />
        </View>
    );
}

// What if we send all state here? when the count changes, the AgeComponent will re-render.
// This is not good for performance.
// So, we should send the smallest piece of state as possible.


type AgeProps = {
    readonly age: number;
    readonly name: string;
    dispatch: React.Dispatch<Action>
}
export const AgeComponent = React.memo<AgeProps>(({ age, name, dispatch }) => {

    console.log('AgeComponent');
    // Use the smalles piece of state as possible
    return (
        <View>
            <Text>${name} is ${age} years old</Text>

            <Button title="Set Age" onPress={() => dispatch({ type: "setAge", age: 30 })} />
        </View>
    );
})

// in zustland, we have actions and setState
// as you can we are fetching data from the server, calling other actions, or doing some side effects.

// but setState is a pure function, it only depends on the state and the action.
// it takes state as an argument and returns a new state.
