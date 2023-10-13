import { MotiView, useAnimationState, AnimatePresence } from "moti";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('screen')

export function App1() {
    return (<View style={styles.container}>
        <MotiView
            from={{
                opacity: 0,
                translateY: -100
            }}
            animate={{
                opacity: 1,
                translateY: 0
            }}
            style={styles.shape} />
    </View>)
}


export function App2() {
    return (<View style={styles.container}>
        <MotiView
            from={{
                opacity: 0,
                translateY: -100
            }}
            animate={{
                opacity: 1,
                translateY: [0, 100, 0, 200]
            }}
            style={styles.shape} />
    </View>)
}


export function App3() {
    return (<View style={styles.container}>
        <MotiView
            from={{
                opacity: 0,
                translateY: -100
            }}
            animate={{
                opacity: 1,
                translateY: [
                    0,
                    {
                        value: 100,
                        type: 'timing',
                        delay: 500
                    },
                    0,
                    200]
            }}
            style={styles.shape} />
    </View>)
}


export function App4() {
    return (<View style={styles.container}>
        <MotiView
            from={{

                translateY: -20
            }}
            animate={{
                translateY: 250
            }}
            transition={{
                type: 'timing',
                repeat: 4,
                //loop: true
                repeatReverse: false
            }}
            style={styles.shape} />
    </View>)
}


export function App5() {
    const [pressed, setPressed] = React.useState(false);
    return (
        <Pressable style={styles.container} onPress={() => {
            setPressed(!pressed)
        }}>
            <MotiView

                animate={{
                    translateY: pressed ? 100 : 0
                }}

                style={styles.shape} />
        </Pressable>)
}


export function App6() {
    const [pressed, setPressed] = React.useState(false);
    const fadeInState = useAnimationState({
        from: {
            opacity: 0,
            rotate: '0deg'
        },
        to: {
            opacity: 1,
            rotate: '40deg'
        },
        up: {
            opacity: 1,
            scale: 2
        }
    })

    const onPress = () => {
        if (fadeInState.current === 'to') {
            fadeInState.transitionTo('up')
        }
    }
    return (
        <Pressable style={styles.container} onPress={() => {
            setPressed(!pressed)
        }}>
            <MotiView

                state={fadeInState}
                delay={500}

                style={styles.shape} />
        </Pressable>)
}


export function PrecenseApp1() {

    const [shown, setShown] = React.useState(true);
    const toogle = () => {
        setShown((isShown) => !isShown)
    }
    return <Pressable
        onPress={toogle}
        style={styles.container}
    >
        <AnimatePresence>
            {shown && <MotiView
                from={{
                    opacity: 0,
                    translateY: -20
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                exit={{
                    opacity: 0,
                    scale: 1.5
                }}
                transition={{
                    type: 'timing'
                }}
                style={styles.shape}
            ></MotiView>}
        </AnimatePresence>
    </Pressable>
}



const Box = ({ color }) => {
    return (<MotiView
    onDidAnimate={(styleProp, finished, value) => {
        console.log(`[${color}]`, { styleProp, finished})
    }}
        from={{
            opacity: 0,
            //translateY: -20
            scale: 0.9,
            width: 100
        }}
        animate={{
            opacity: 1,
            //translateY: 0,
            scale: 1,
            width: 200
        }}
        exit={{
            opacity: 0,
            scale: 1.5,
            width: 100
        }}
        transition={{
            type: 'timing'
        }}
        style={[styles.shape, {
            backgroundColor: color
        }]}
    ></MotiView>
    )
}
export function PrecenseApp2() {

    const [shown, setShown] = React.useState(true);
    const toogle = () => {
        setShown((isShown) => !isShown)
    }
    return <Pressable
        onPress={toogle}
        style={styles.container}
    >
        <AnimatePresence exitBeforeEnter>
            {shown && <Box  key='cyan' color={'cyan'} />}
            {!shown && <Box key="#FF0080" color={'#FF0080'} />}
        </AnimatePresence>
    </Pressable>
}



const Box2 = ({ to, from }) => {
    return (<MotiView
    
        from={{
            backgroundColor: from
        }}
        animate={{
            backgroundColor: [to, '#00FF22', '#FFDD00']
            // [] don't work with loop: true
        }}
        
        transition={{
            type: 'timing',
            duration: 3000,
            //loop: true
        }}
        style={[styles.shape]}
    ></MotiView>
    )
}


export default function PrecenseApp3() {

    const [shown, setShown] = React.useState(true);
    const toogle = () => {
        setShown((isShown) => !isShown)
    }
    return <Pressable
        onPress={toogle}
        style={styles.container}
    >
        <AnimatePresence exitBeforeEnter>
            <Box2  key='cyan' from={'cyan'} to={'red'}/>
        </AnimatePresence>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shape: {
        width: 150,
        height: 150,
        backgroundColor: 'cyan',
        borderRadius: 16
    }
})