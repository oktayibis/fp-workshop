// We generally avoid using any because it defeats the purpose of using TypeScript.
// any essentially turns off type checking for that variable, 
// making it behave like regular JavaScript and losing the benefits of TypeScript's static typing.

import React from "react";
import { View, Text, Button, Pressable } from "react-native";

function uppercase(text: any): string {
    // conver it to correct type
    return text.toUpperCase();
}

// What if, we don't know the type of text
// We can use unknown type
function uppercaseUnknown(text: unknown): string {
    if (typeof text === 'string') {
        return text.toUpperCase();
    }

    console.error('The text is not a string');
    return '';
}

// We can also use type guards
// Type guards are some expression that performs a runtime check that guarantees the type in some scope.

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
}

function uppercaseUnknownWithGuard(text: unknown): string {
    if (isString(text)) {
        return text.toUpperCase();
    }

    console.error('The text is not a string');
    return '';
}

// We can also use type assertion
// Type assertion is a way to tell the compiler "trust me, I know what I'm doing."
// It has two forms: "angle-bracket" syntax and as-syntax
function uppercaseUnknownWithTypeAssertion(text: unknown): string {
    return (text as string).toUpperCase(); // as-syntax
    // this is not safe, it's like using any
    // Only use it generic type assertion
}

// Never type
// The never type represents the type of values that never occur.
// For example, a function that always throws an error or never returns.
// It's a subtype of all types and assignable to all types.
function throwError(message: string): never {
    throw new Error(message);
}

// Generics
// Generics are a way to make components more reusable.
// They allow you to write a component that can work with any data type.
// They are similar to function arguments.
// Generics are used to create reusable components that can work with any data type.

// Example of a generic function
function identity<T>(arg: T): T {
    return arg;
}

identity<string>('Hello'); // returns 'Hello'

// Example of a generic interface
interface GenericIdentityFn {
    <T>(arg: T): T;
}

const identityFn: GenericIdentityFn = identity;

identityFn<string>('Hello'); // returns 'Hello'

// More generics T, U, K, V
// T is a type parameter
// U, K, V are also type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const mergedObj = merge({ name: 'John' }, { age: 30 });

console.log(mergedObj.name); // returns 'John'}

// Generic with constraints
// You can also add constraints to generics.
// This allows you to specify that a type parameter must extend a certain type.
// For example, you can specify that a type parameter must have a length property.
const getLength = <T extends { length: number }>(arg: T): number => {
    return arg.length;
}

getLength('Hello'); // returns 5

// Generic with default type
// You can also specify a default type for a generic.
// If the type is not provided, it will default to the specified type.
function defaultIdentity<T = string>(arg: T): T {
    return arg;
}


defaultIdentity<number>(2); // returns 'Hello'

function request<TBody, TResponse = unknown>(url: string, body?: TBody): Promise<TResponse> {
    return fetch(url, { method: 'POST', body: JSON.stringify(body) })
        .then(response => response.json())
        .then(data => data as TResponse);
}


const getAccountList = request<never, { name: string }>('https://jsonplaceholder.typicode.com/todos/1');


// keyof
// The keyof operator returns the keys of an object type as a union of string literal types.
// It is useful for creating type-safe functions that work with object keys.
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // 'name' | 'age'

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person: Person = { name: 'John', age: 30 };

const name2 = getProperty(person, 'age'); // returns 'John'

// typeof

// The typeof operator returns the type of a value or variable.
// It is useful for creating type-safe functions that work with object types.
const person2 = { name: 'John', age: 30 };

type PersonType = typeof person2; // { name: string, age: number }

function getPersonName(person: PersonType): string {
    return person.name;
}

const name3 = getPersonName(person2); // returns 'John'

// Conditional types
// Conditional types allow you to create types that depend on a condition.
// They are similar to if-else statements for types.
// You can use conditional types to create more complex type transformations.
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>; // 'yes'

type B = IsString<number>; // 'no'

// Conditional types with generics
// You can also use generics with conditional types.
// This allows you to create more flexible type transformations.
type ExtractStrings<T> = T extends string | number ? string : never; // Extracts strings from a union type

type C = ExtractStrings<string>; // 'string'
const d: C = 'Hello';


// Mapped types
// Mapped types allow you to create new types by transforming the properties of an existing type.
// You can use mapped types to create more flexible and reusable types.
interface Person3 {
    name: string;
    age: number;
}

type ReadonlyPerson = {
    readonly [K in keyof Person3]: Person3[K];
}

const person3: ReadonlyPerson = { name: 'John', age: 30 };

// Partial
// The Partial type makes all properties of a type optional.
interface Person4 {
    name: string;
    age: number;
}

type PartialPerson = Partial<Person4>;

const person4: PartialPerson = { name: 'John' };

// Nice for update
type State = {
    name: string;
    age: number;
}
const state: State = { name: 'John', age: 30 };
const updateState = (state: State, newState: Partial<State>) => {
    return { ...state, ...newState };
}

updateState(state, { name: 'Jane' });

// Pick
// The Pick type allows you to create a new type by selecting properties from an existing type.
interface Person5 {
    name: string;
    age: number;
    address: { street: string; city: string };
}

type Address = Pick<Person5, 'address'>;

const person5: Address = { address: { city: 'New York', street: '123 Main St' } };

// Omit
// The Omit type allows you to create a new type by omitting properties from an existing type.
interface Person6 {
    name: string;
    age: number;
    address: string;
}

type PersonWithoutAddress = Omit<Person6, 'address'>;

const person6: PersonWithoutAddress = { name: 'John', age: 30 };

// Exclude
// The Exclude type allows you to exclude certain types from a union type.
// It is useful for creating more specific types.
type A2 = string | number | boolean;

type B2 = Exclude<A2, boolean>; // string | number

// Extract
// The Extract type allows you to extract certain types from a union type.
type Address2 = { street: string; city: string };
type PersonalInfo = { name: string; age: number };
type IsActive = boolean;

type A3 = Address2 | PersonalInfo | IsActive;

type B3 = Extract<A3, Address2>; // Address

const address2: B3 = { street: '123 Main St', city: 'New York' };

// NonNullable
// The NonNullable type removes null and undefined from a type.
type A4 = string | null | undefined;

type B4 = NonNullable<A4>; // string


// Record
// The Record type allows you to create a new type by mapping keys to values.
type Person7 = 'name' | 'age';

type PersonRecord = Record<Person7, string>;

const person7: PersonRecord = { name: 'John', age: '30' };


// Tuple
// The Tuple type allows you to create a fixed-length array with specific types at each index.
type Person8 = [string, number];

const person8: Person8 = ['John', 30];

// ReadonlyArray
// The ReadonlyArray type makes an array read-only.
type Person9 = ReadonlyArray<string>;

const person9: Person9 = ['John', 'Jane'];

// Map
// The Map type allows you to create a new type by mapping keys to values.
type PersonMap = Map<string, number>;

const personMap: PersonMap = new Map();
personMap.set('John', 30);

// Differece between Map and Array
// Map is a key-value pair, it's like an object
// Array is a list of values
// Map is more faster than Array in searching, also map is more secure and id is unique
// Array is more faster than Map in iteration

// Set
// The Set type allows you to create a new type by mapping keys to values, it's like an array but with unique values.
type PersonSet = Set<string>;

const personSet: PersonSet = new Set();
personSet.add('John');
personSet.add('Jane');

const myArray = [1, 2, 2, 3, 4, 4, 4]
const mySet = new Set(myArray);
console.log(mySet); // Set { 1, 2, 3, 4 }
// Set to Array
const myArray2 = [...mySet];
console.log(myArray2); // [1, 2, 3, 4]




// Discriminated unions
// Discriminated unions are a pattern in TypeScript that allows you to create type-safe unions of objects.
// They are useful for creating more complex types that depend on a specific property.
interface Square {
    type: 'square'; // Discriminant property -> kind or type
    size: number;
}

interface Circle {
    type: 'circle';
    radius: number;
}

type Shape = Square | Circle;

function getArea(shape: Shape): number {
    switch (shape.type) { // for avodding swtich case for all, we use the Unions lib. 
        case 'square':
            return shape.size ** 2;
        case 'circle':
            return Math.PI * shape.radius ** 2;
    }
}

const square: Square = { type: 'square', size: 5 };
const circle: Circle = { type: 'circle', radius: 5 };

getArea(square); // returns 25
getArea(circle); // returns 78.54




// Conclusion
// TypeScript is a powerful tool for creating type-safe JavaScript code.
// It provides static type checking, which helps catch errors at compile time.
// It also offers advanced features like generics, conditional types, and mapped types, which allow you to create more flexible and reusable code.
// By using TypeScript, you can write safer and more maintainable code, leading to fewer bugs and better developer productivity.

// React

// When using react, type has to norrow down to the smallest possible type

type Account = {
    id: string;
    name: string;
    email: string;
    amount: number;
}

type AccountList = Account[];

const accountList: AccountList = [
    { id: '1', name: 'John', email: 'test@test.com', amount: 100 },
    { id: '2', name: 'Jane', email: 'test2@test.com', amount: 200 },
]

// Props should be readonly
// Props has to smallest possible type
// Please be aware that, component has to only relation with props, not with state
// Component only contains enough data, not for too much or less. only mandatory data
const AccountName: React.FC<{ name: string, onPress: () => void }> = React.memo(({ name, onPress }) => {
    console.log('Rendering AccountName', name);


    return <Pressable onPress={onPress} style={{ padding: 10, borderWidth: 2 }}><Text>{name}</Text></Pressable>
})

// Note: Explain different usecases for the memo and callback here. 
const AccountItem: React.FC<{ account: Account }> = React.memo(({ account }) => {

    const onPress = React.useCallback(() => {
        console.log('Pressed', account.name);
    }, [account.name])

    return (
        <View>
            <AccountName name={account.name} onPress={onPress} />
            <Text>{account.email}</Text>
            <Text>{account.amount}</Text>
        </View>
    )
})

const AccountList: React.FC<{ accounts: Account[] }> = React.memo(({ accounts }) => {
    return (
        <View>
            {accounts.map(account => (
                <AccountItem key={account.id} account={account} />
            ))}
        </View>
    )
})


export const AccountScreen = React.memo(() => {
    // Handle effects here
    const [accounts, setAccounts] = React.useState<AccountList>(accountList);

    const onAddAccount = React.useCallback(() => {
        setAccounts(prev => [
            ...prev,
            { id: Math.random().toString(), name: 'Alice', email: 'test3@test.com', amount: 300 }
        ])
    }, [])

    const changeMail = React.useCallback(() => {
        setAccounts(prev => prev.map(account => ({ ...account, email: account.email.toUpperCase() })))
    }, [])

    return (
        <View>
            <View>
                <Text>Account List</Text>
            </View>
            <AccountList accounts={accounts} />
            <Button title="Add" onPress={onAddAccount} />
            <Button title="Change Mail" onPress={changeMail} />
        </View>
    )
})

// Tricks and Tips
type YourConfig = {
    id: string;
    title: string;
}

const defaultConfig: YourConfig = {
    id: '1',
    title: 'Default Title'
}

const showError = (error: Error, config: Partial<YourConfig> = defaultConfig) => {

    return {
        ...defaultConfig,
        ...config,
    }
}

showError(new Error('Something went wrong'));