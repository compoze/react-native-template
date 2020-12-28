import DocumentPicker from 'react-native-document-picker';
import { filesUriPicker, fileUriPicker } from './PickerRoot';

export const ImagePicker = async (): Promise<string> => {
  // Pick a single file
  return await fileUriPicker({ type: [DocumentPicker.types.images] }).then(
    (str) => str
  );
};
export const ImagesPicker = async (): Promise<string[]> => {
  // Pick multiple files
  return await filesUriPicker({ type: [DocumentPicker.types.images] }).then(
    (str) => str
  );
};
