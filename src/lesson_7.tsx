import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { faker, simpleFaker } from '@faker-js/faker'

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: simpleFaker.string.uuid(),
        image: `https://randomuser.me/api/portraits/men/${faker.number.int(60)}.jpg`,
        name: faker.person.fullName(),
        jobTitle: faker.person.jobTitle(),
        email: faker.internet.email(),
    };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG = require('../assets/bg.jpg')
const ITEM_SIZE = AVATAR_SIZE; + SPACING * 3;
export default () => {

    const scrollY = React.useRef(new Animated.Value(0)).current;

    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image source={BG_IMG}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}
        />
        <Animated.FlatList
            data={DATA}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            keyExtractor={item => item.key}
            contentContainerStyle={{
                padding: SPACING,
                paddingTop: StatusBar.currentHeight || 42
            }}
            renderItem={({ item, index }) => {

                const inputRange = [
                    -1, 0, ITEM_SIZE * index,
                    ITEM_SIZE * (index + 2)
                ]
                const scale = scrollY.interpolate({
                    inputRange, outputRange: [1, 1, 1, 0]
                })
                return <Animated.View style={{
                    flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10
                    },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    transform: [{ scale }]
                }}>
                    <Image source={{ uri: item.image }}
                        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2 }} />


                    <View>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                        <Text style={{ fontSize: 18, opacity: .7 }}>{item.jobTitle}</Text>
                        <Text style={{ fontSize: 14, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
                    </View>
                </Animated.View>

            }}
        />
    </View>
}
