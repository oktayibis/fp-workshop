// Higher Order Function
// A higher-order function is a function that takes a function as an argument or returns a function.
// It is a powerful concept in functional programming that allows you to write reusable and composable code.

import React, { Component } from "react";
import { View, Text, Button, StyleSheet, LogBox } from "react-native";

// In the OOP, we have classes and objects, and in functional programming, we have functions and higher-order functions.
// In OOP

class Animal {
    constructor(public name: string) { }
}

class Dog extends Animal {
    bark() {
        console.log("Woof! Woof!");
    }
}

class Cat extends Animal {
    meow() {
        console.log("Meow! Meow!");
    }
}

const dog = new Dog("Buddy");
dog.bark(); // Output: Woof! Woof!

const cat = new Cat("Tom");
cat.meow(); // Output: Meow! Meow!

// In functional programming we have functions and higher-order functions
// Define types In FP we are using interfaces and types to define the shape of the data. (As possible we should use types)
// Define a type
interface Animal2 {
    name: string;
    makeSound: () => void;
}
// type Animal3 = {
//     name: string;
//     makeSound: () => void;
// };

// type Dog5 = Animal3 & {
//     bark: () => void;
// };

interface Dog2 extends Animal2 {
    bark: () => void;
}

// Create factory functions instead of constructors
const createAnimal = (name: string): Animal2 => ({
    name,
    makeSound: () => console.log(`${name} makes a sound`),
});

const createDog = (name: string): Dog2 => ({
    ...createAnimal(name),
    bark: () => console.log("Woof! Woof!"),
});

const myDog = createDog("Buddy");
myDog.makeSound(); // Output: Buddy makes a sound
myDog.bark(); // Output: Woof! Woof!

// Higher-order functions -> factory functions
function multiplyBy(factor: number): (num: number) => number {
    return function (num: number): number {
        return num * factor;
    };
}

const multiplyByTwo = multiplyBy(2); // create a new function that multiplies by 2
console.log(multiplyByTwo(5)); // Output: 10

const multiplyBy100 = multiplyBy(100);
const result2 = multiplyBy100(5); // Output: 500

// Another example
function add(a: number): (b: number) => number {
    return function (b: number): number {
        return a + b;
    };
}

const addTwo = add(2); // create a new function that adds 2
console.log(addTwo(5)); // Output: 7

// Another common example of a higher-order function is the map function.
// The map function is a higher-order function that takes a function as an argument and applies that function to each element of an array.
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((num) => num * 2);

// let's write own map function



 // --------------------- Compose function --------------------- //
// Compose function

// This is quite common in functional programming to compose functions.
// Composing functions means chaining multiple functions together to create a new function.

const addOne = (num: number) => num + 1; // is this pure?
const multiplyByThree = (num: number) => num * 3;

function compose<T>(...fns: Array<(args: T) => T>) {
    return (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);
}

const addOneAndMultiplyByThree = compose(multiplyByThree, addOne);
addOneAndMultiplyByThree(3);

// Let's think about how to we create a request handler for http calls with totally FP approach.

const getRequest = async (url: string): Promise<Response> => {
    try {
       return fetch(url);
    } catch (error) {
        console.log(error);
    }
};

const toJson = async (response: Response): Promise<unknown> => {
    try {
        return response.json();
    } catch (error) {
        console.log("Error in Json", error);
    }
};

// demo request

function asyncPipe<
    F extends ((arg: any) => any)[],
    TInput = Parameters<F[0]>[0],
    TOutput = ReturnType<
        F extends [...any[], (arg: any) => infer R] ? (arg: any) => R : never
    >
>(...fns: F) {
    return (initialValue: TInput): Promise<Awaited<TOutput>> => {
        return fns.reduce(
            async (acc, fn) => fn(await acc),
            Promise.resolve(initialValue)
        );
    };
}

type Account = {
    id: string;
    accountNo: number;
};
const accountValidator = {
    parse: (data: unknown): Account => ({
        accountNo: 21,
        id: "id",
    }),
};

const getAccountList = asyncPipe(fetch, toJson, accountValidator.parse);

// const response = getAccountList('https://jsonplaceholder.typicode.com/todos/1')

// Write a Debounce fn

// Write a basic Error handling

// Write memoization


//### High Order Components

// Higher-order components (HOCs) are a pattern in React that allows you to reuse component logic.
// A higher-order component is a function that takes a component and returns a new component with additional props or functionality.

// Builtin React HOCs
// React.memo
// React.forwardRef
// React.lazy
// React.Suspense

// Redux connect function is also a HOC, it connects a React component to a Redux store.

// Basic Example: Simple HOC for Loading State

interface WithLoadingProps {
    isLoading: boolean;
}

function withLoading<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
    return ({ isLoading, ...props }: WithLoadingProps & P) => {
        if (isLoading) {

            return (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "red" }}>Loading...</Text>
                </View>
            );
        }
        return <WrappedComponent {...(props as P)} />;
    };
}

// Usage
export const MyPureComponent: React.FC<{ data: string }> = ({ data }) => {
    return <Text>{data}</Text>;
};
export const MyComponentWithLoading = withLoading(MyPureComponent);

// In a parent component
export default function MyScreen() {
    const [isLoading, setIsLoading] = React.useState(true);
    // connect zustland, any other state
    const [data, setData] = React.useState<string>("");

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setData("Hello, World!");
        }, 2000);
    }, []);

    return (
        <View>
            <MyComponentWithLoading isLoading={isLoading} data={data} />
        </View>
    );
}
