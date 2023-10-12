
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as React from 'react'
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";


const _colors = {
    active: '#2C2C2C',
    inactive: '#DCDCDC'
}


type SwitchProps = {
    size: number;
    onPress: () => void;
    isActive: boolean;
}



const transition: any = {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.ease)
}
const Switch: React.FC<SwitchProps> = ({ size, onPress, isActive }) => {

    const trackWidth = React.useMemo(() => {
        return size * 1.5;
    }, [size])

    const trackHeight = React.useMemo(() => {
        return size * 0.4;
    }, [size])

    const knobSize = React.useMemo(() => {
        return size * 0.6;
    }, [size])

    return (
        <Pressable onPress={onPress}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MotiView
                    transition={transition}
                    
                    animate={{
                        backgroundColor: isActive ? _colors.active : _colors.inactive
                    }}
                    style={{
                        position: 'absolute',
                        width: trackWidth,
                        height: trackHeight,
                        backgroundColor: _colors.active,
                        borderRadius: trackHeight / 2
                    }}
                />

                <MotiView
                    transition={transition}
                    animate={{
                        translateX: isActive ? trackWidth / 4 : -trackWidth / 4
                    }}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                    <MotiView
                    transition={transition}
                    animate={{
                        width: isActive ? 0 : knobSize,
                        borderColor: isActive ? _colors.active : _colors.inactive
                    }}
                    style={{
                        width: knobSize,
                        height: knobSize,
                        borderRadius: knobSize / 2,
                        borderWidth: size * 0.1,
                        borderColor: _colors.active,
                        backgroundColor: isActive ? _colors.active : _colors.inactive
                    }}
                    />
                </MotiView>

            </View>

        </Pressable>
    )
}

export default function App() {

    const [isActive, setIsActive] = React.useState(false);

    return (<View style={styles.container}>
        <Switch size={60} onPress={() => {
            setIsActive((isActive) => !isActive)
        }} isActive={isActive} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})