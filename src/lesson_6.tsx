import * as React from 'react';
import {
    StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Easing,
    SafeAreaViewBase,
    SafeAreaView,
} from 'react-native';
const { width, height } = Dimensions.get('screen');

import { PEXELS_API_KEY } from './config_example';
//import { PEXELS_API_KEY } from './config_examplae';

const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"
const IMAGE_SIZE = 80;
const SPACING = 10;
const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL, {
        headers: {
            'Authorization': PEXELS_API_KEY
        }
    })

    const { photos } = await data.json();
    return photos;
}

export default () => {

    const [images, setImages] = React.useState(null)
    React.useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchImagesFromPexels();
            setImages(images)
        }
        fetchImages();
    }, [])
    const topRef = React.useRef();
    const thumbRef = React.useRef();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const scrollToActiveIndex = (index) => {
        //setIndex
        // scrool flatlists
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }
    if (!images) {
        return <Text>Loading</Text>
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <FlatList
                ref={topRef}
                data={images}
                keyExtractor={item => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
                }}
                renderItem={({ item }) => {
                    return <View style={{ width, height }}><Image source={{ uri: item.src.portrait }} style={[StyleSheet.absoluteFillObject]} /></View>
                }}
             />

            

            <FlatList
                ref={thumbRef}
                data={images}
                keyExtractor={item => item.id.toString()}
                horizontal
                style={{ position: 'absolute', bottom: IMAGE_SIZE }}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return(<TouchableOpacity onPress={()=> {
                                scrollToActiveIndex(index)
                            }}>
                                    <Image source={{ uri: item.src.portrait }} style={{
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE,
                                        borderRadius: 12,
                                        marginRight: SPACING,
                                        borderWidth: 2,
                                        borderColor: activeIndex === index ? '#fff' : 'transparent'
                                    }} />
                                </TouchableOpacity>
                            )
                }}
            />

            

        </View>
    )
};