import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styleConstants } from '../config/constants';
import { Icon } from 'react-native-elements';
import { UserStore } from '../stores/UserStore';
import { LocationService } from '../services/LocationService';
import { Location } from '../model/Location';

interface Coord {
  latitude: number;
  longitude: number;
}

interface Props {
  userStore: UserStore;
  locationService: LocationService;
  navigation: any;
  route: any;
}

interface State {
  error: string;
  userPosition: Coord;
  locations: Location[];
}

const INITIAL_ALTITUDE = 6;
const INITIAL_LAT_LONG_ZOOM_DELTA = 11;
const { width, height } = Dimensions.get('window');
export class Map extends React.Component<Props, State> {
  itemRefs = {};
  watchID: number | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      error: '',
      userPosition: { latitude: 44.9764, longitude: -93.268548 },
      locations: [],
    };
  }

  componentDidMount = async () => {
    this.props.locationService.getLocations().then((locations: Location[]) => {
      this.setState({
        locations,
      });
    });
  };

  componentWillUnmount = () => {};

  createMarker = (location: Location) => {
    return (
      <Marker
        onPress={() => alert(location.description)}
        key={location.name}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      >
        <Icon name="map-marker" type="font-awesome" color="red" />
      </Marker>
    );
  };

  public render(): JSX.Element {
    const { error, userPosition, locations } = this.state;

    if (error) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>There was an Error, or your location could not be found</Text>
          <Text>{error}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.mapContainer}>
          <MapView
            //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            // ref={this.setMapRef}
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
            {locations.map((location: Location) => {
              return this.createMarker(location);
            })}
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
