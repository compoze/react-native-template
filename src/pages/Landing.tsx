import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  View,
} from 'react-native';
import { styleConstants } from '../config/constants';
import { copy } from '../config/static.copy';
import { ContentService } from '../services/ContentService';
import { Button } from '../components/button';
import { Icon } from 'react-native-elements';

interface Props {}

interface State {
  content: any[];
}

const contentService = new ContentService();
export class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount = () => {
    const content: any = contentService.getAllContents();
    this.setState({ content });
  };

  public render(): JSX.Element {
    return (
      <ScrollView style={styles.scroll}>
        <ImageBackground
          style={styles.titleBlock}
          source={require('../images/DefaultLandingImage.png')}
        >
          <Text style={styles.title}>{copy.landingUIStrings.TITLE}</Text>
          <Text style={styles.subTitle}>{copy.landingUIStrings.SUB_TITLE}</Text>

          <Button style={styles.actionButton} invalid={false}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.buttonText}>
                {copy.landingUIStrings.DEFAULT_ACTION_TITLE}&nbsp;
              </Text>
              <Icon color="white" name="arrow-forward" />
            </View>
          </Button>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    width: '100%',
    height: '100%',
  },
  titleBlock: {
    flex: 1,
    padding: '7.5%',
    minHeight: 700,
  },
  title: {
    color: 'white',
    fontSize: styleConstants.fontSize.MASSIVE,
  },
  subTitle: {
    color: 'white',
    fontSize: styleConstants.fontSize.XX_LARGE,
    paddingVertical: '7.5%',
  },
  actionButton: {
    width: '60%',
  },
  buttonText: {
    color: 'white',
    fontSize: styleConstants.fontSize.LARGE,
  },
});
