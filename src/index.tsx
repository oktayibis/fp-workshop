import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AgeComponent, ImpureComponentWithStateManagement, MyPureComponent, RegularComponent } from "./PureComponents";
import { Immutable } from "./Mutable";
import MyScreen from "./HighOrder";
import { AccountScreen } from "./TSBesties";

const MainApp = React.memo(function MainApp() {
    const [id, setId] = React.useState(0);
    const [anotherId, setAnotherId] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const onChange = React.useCallback(() => { //
        setId((prev) => prev + 1);
    }, []);


        const onAnotherChange = React.useCallback(() => {
            setAnotherId((prev) => prev + 1);
    }, [])
    return (
        <View style={styles.container}>
            <Text>MainApp</Text>
            <AccountScreen />
            {/* <MyScreen /> */}
            {/* <AgeComponent /> */}
            {/* <ImpureComponentWithStateManagement /> */}
            {/* <Immutable count={id} setCount={setId} /> */}
            {/* <MyPureComponent id={id.toString()} /> */}
            {/* <ButtonWrapper onPress={onChange} /> */}
            {/* <RegularComponent id={anotherId.toString()} /> */}
            {/* <ButtonWrapper onPress={onAnotherChange} /> */}
        </View>
    );
});

export default MainApp;


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,

    },
});

const ButtonWrapper = React.memo<{ readonly onPress: () => void }>(function ButtonWrapper({ onPress }) {
    console.log('Rendering ButtonWrapper');

    return <Button title="Change Id" onPress={onPress} />;
})