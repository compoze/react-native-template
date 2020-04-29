import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    Text,
    Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import { IOS_GOOGLE_API_KEY, ANDROID_GOOGLE_API_KEY } from 'react-native-dotenv';
import { styleConstants } from '../config/constants';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { Icon } from 'react-native-elements';
import { UserStore } from '../stores/UserStore';

let GOOGLE_MAPS_APIKEY = '';
// if (Platform.OS == 'ios') {
//     GOOGLE_MAPS_APIKEY = IOS_GOOGLE_API_KEY;
// } else {
//     GOOGLE_MAPS_APIKEY = ANDROID_GOOGLE_API_KEY;
// }

interface Coord {
    latitude: number;
    longitude: number;
}

interface Props {
    userStore: UserStore;
    navigation: any;
    route: any;
}

interface State {
    error: string;
    userPosition: Coord;
}

const INITIAL_ALTITUDE = 600;
const INITIAL_LAT_LONG_ZOOM_DELTA = 11;
const { width, height } = Dimensions.get('window');
export class Map extends React.Component<Props, State> {
    itemRefs = {};
    watchID: number | null = null;
    constructor(props: Props) {
        super(props);
        this.state = {
            error: '',
            userPosition: { latitude: 44.976400, longitude: -93.268548 },
        };
    }

    componentDidMount = async () => {

    }

    componentWillUnmount = () => {
    }

    setMapRef = (mapView: MapView): void => {
    }

    public render(): JSX.Element {
        const { error, userPosition } = this.state;
        const { route } = this.props;
        if (error) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>
                        There was an Error, or your location could not be found
                    </Text>
                    <Text>
                        {error}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        ref={this.setMapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: userPosition.latitude,
                            longitude: userPosition.longitude,
                            latitudeDelta: 0.9,
                            longitudeDelta: 0.9 * (width / (height - 200)),
                        }}
                        initialCamera={{
                            center: {
                                latitude: userPosition.latitude,
                                longitude: userPosition.longitude,
                            },
                            pitch: 0,
                            heading: 0,
                            altitude: INITIAL_ALTITUDE,
                            zoom: INITIAL_LAT_LONG_ZOOM_DELTA,
                        }}
                        showsUserLocation={true}
                    >
                        {/* {destinationPosition.latitude === 0 && destinationPosition.longitude === 0 && destinations.map((destination, index) => {
                                // this seems a little repetetive, but I get an ios bug otherwise
                                // possibly look into later
                                if (selectedDestinationIndex === index) {
                                    return (
                                        <Marker
                                            ref={el => (this.itemRefs[index] = el)}
                                            onPress={() => alert('hello')}
                                            key={`destination:${destination.id}` + Date.now()}
                                            coordinate={{
                                                latitude: destination.latitude,
                                                longitude: destination.longitude,
                                            }}
                                        >
                                            <Icon name='map-marker' type='font-awesome' color='blue' size={40} />
                                        </Marker>
                                    )
                                } else {
                                    return (
                                        <Marker
                                            ref={el => (this.itemRefs[index] = el)}
                                            onPress={() => alert('hello')}
                                            key={`destination:${destination.id}`}
                                            coordinate={{
                                                latitude: destination.latitude,
                                                longitude: destination.longitude,
                                            }}
                                        >
                                            <Icon name='map-marker' type='font-awesome' color='red' />
                                        </Marker>
                                    )
                                }
                            })} */}
                    </MapView>
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: height - 80,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
