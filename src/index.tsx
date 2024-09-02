import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
    AgeComponent,
    ImpureComponentWithStateManagement, LionPureComponent,
    RabbitComponentNoMemo,
} from "./PureComponents";
import { Immutable } from "./Mutable";
import MyScreen from "./HighOrder";
import { AccountScreen } from "./TSBesties";

const MainApp = React.memo(function MainApp() {
    const [rabbit, setRabbit] = React.useState(0);
    const [lion, setLion] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const onAddRabbit = React.useCallback(() => { //
        setRabbit((prev) => prev + 1);
    }, []);


        const onAddLion = React.useCallback(() => {
            setLion((prev) => prev + 1);
    }, [])
    return (
        <View style={styles.container}>
            <Text>MainApp</Text>
            {/*<AccountScreen />*/}
            {/* <MyScreen /> */}
            {/* <AgeComponent /> */}
            {/* <ImpureComponentWithStateManagement /> */}
            {/* <Immutable count={id} setCount={setId} /> */}

            <View style={styles.lionContainer}>
                <LionPureComponent lionCount={lion} />
            </View>
            <View style={styles.rabbitContainer}>
                <RabbitComponentNoMemo count={rabbit} />

            </View>
             <ButtonWrapper variant='dark' title='Add Rabbit' onPress={onAddRabbit} />
             <ButtonWrapper variant='light' title='Add Lion' onPress={onAddLion} />
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
    rabbitContainer: {
        backgroundColor: 'lightblue',
        padding: 20,
        margin: 10,
    },
    lionContainer: {
        backgroundColor: 'lightgreen',
        padding: 20,
        margin: 10,
    },
});

const ButtonWrapper = React.memo<{readonly title:string,readonly onPress: () => void, variant:'dark' | 'light' }>(function ButtonWrapper({ onPress, title, variant }) {
    console.log('Rendering ButtonWrapper');

    return <Button title={title} onPress={onPress} color={variant === 'dark' ? 'black' : 'blue'} />;
})




