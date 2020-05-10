import { KeyboardType } from 'react-native';

type FontWeight =
  | '300'
  | '400'
  | '500'
  | '700'
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '600'
  | '800'
  | '900'
  | undefined;

export const styleConstants = {
  colors: {
    PRIMARY: '#0D215C', // Update these to represent your app
    SECONDARY: '#4280F6',
    PRIMARY_UNDERLAY: '#FE9847BB', // This is the standard button highlight
    TITLE_PRIMARY: '#0D215C',
    TEXT_PRIMARY: '#000',
    TRANSPARENT: 'transparent',
    PRIMARY_BUTTON: '#0D88BC',
    PRIMARY_BUTTON_DISABLED: '#7B8295',
    GRAY: '#807E7E',
    STATUS_BAR: '#4197D6',
    FADED_WHITE: '#FFFFFFAA',
    TOS_BODY_COPY: '#828282',
    DRAWER_ACTIVE_TINT: '#F3A947',
    DRAWER_BG: '#00000000',
    DRAWER_INACTIVE_TINT: '#727272',
    APP_BACKGROUND: '#FFF',
    INPUT_BACKGROUND: '#F6F8FB',
    INPUT_BACKGROUND_BORDER: '#757E99',
  },
  fontFamily: { DEFAULT: 'Arial' }, // May have to change this
  fontWeight: {
    LIGHT: '300' as FontWeight,
    NORMAL: '400' as FontWeight,
    SEMI_BOLD: '500' as FontWeight,
    BOLD: '700' as FontWeight,
  },
  fontSize: {
    SMALL: 12,
    DEFAULT: 14,
    MEDIUM: 16,
    LARGE: 18,
    X_LARGE: 22,
    XX_LARGE: 24,
    MASSIVE: 48,
  },
};

export const DefaultNavBarContainerStyle = {
  height: 56,
  width: '100%',
  backgroundColor: styleConstants.colors.GRAY,
  borderBottomWidth: 0,
};

type DimensionsParameter = 'window' | 'screen';

export const rnAPIParams = {
  dimensions: {
    WINDOW: 'window' as DimensionsParameter,
    SCREEN: 'screen' as DimensionsParameter,
  },
  platform: {
    ANDROID: 'android',
    IOS: 'ios',
  },
};

type KeyboardAvoidingViewBehaviorParameter =
  | 'padding'
  | 'height'
  | 'position'
  | undefined;
type ResizeMode =
  | 'cover'
  | 'contain'
  | 'stretch'
  | 'center'
  | 'repeat'
  | undefined;
type PointerEvents = 'none' | 'auto' | 'box-none' | 'box-only' | undefined;
type ActivityIndicatorSize = number | 'small' | 'large' | undefined;
type AutoCapitalize = 'none' | 'sentences' | 'words' | 'characters';

export const rnComponentProps = {
  keyboardAvoidingView: {
    behavior: {
      PADDING: 'padding' as KeyboardAvoidingViewBehaviorParameter,
      HEIGHT: 'height' as KeyboardAvoidingViewBehaviorParameter,
      POSITION: 'position' as KeyboardAvoidingViewBehaviorParameter,
    },
  },
  image: {
    resizeMode: {
      COVER: 'cover' as ResizeMode,
      CONTAIN: 'contain' as ResizeMode,
      STRETCH: 'stretch' as ResizeMode,
      REPEAT: 'repeat' as ResizeMode,
      CENTER: 'center' as ResizeMode,
    },
  },
  view: {
    pointerEvents: {
      NONE: 'none' as PointerEvents,
      BOX_NONE: 'box-none' as PointerEvents,
      BOX_ONLY: 'box-only' as PointerEvents,
    },
  },
  activityIndicator: {
    size: {
      SMALL: 'small' as ActivityIndicatorSize,
      LARGE: 'large' as ActivityIndicatorSize,
    },
  },
  textInput: {
    keyboardType: {
      EMAIL_ADDRESS: 'email-address' as KeyboardType,
      NUMERIC: 'numeric' as KeyboardType,
      PHONE_PAD: 'phone-pad' as KeyboardType,
    },
    autoCapitalize: {
      NONE: 'none' as AutoCapitalize,
      SENTENCES: 'sentences' as AutoCapitalize,
      WORDS: 'words' as AutoCapitalize,
      CHARACTERS: 'characters' as AutoCapitalize,
    },
  },
};

type HeaderMode = 'screen' | 'float' | 'none' | undefined;

export const reactNavigationParams = {
  headerMode: {
    SCREEN: 'screen' as HeaderMode,
    FLOAT: 'float' as HeaderMode,
    NONE: 'none' as HeaderMode,
  },
};
