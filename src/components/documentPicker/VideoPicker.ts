import DocumentPicker from 'react-native-document-picker';
import { filesUriPicker, fileUriPicker } from './PickerRoot';

export const VideoPicker = async (): Promise<string> => {
  // Pick a single file
  return await fileUriPicker({ type: [DocumentPicker.types.video] }).then(
    (str) => str
  );
};
export const VideosPicker = async (): Promise<string[]> => {
  // Pick multiple files
  return await filesUriPicker({ type: [DocumentPicker.types.video] }).then(
    (str) => str
  );
};
