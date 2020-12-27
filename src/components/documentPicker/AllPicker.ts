import DocumentPicker from 'react-native-document-picker';
import { filesUriPicker, fileUriPicker } from './PickerRoot';
export const AllFilePicker = async (): Promise<string | undefined> => {
  // Pick a single file
  return await fileUriPicker({ type: [DocumentPicker.types.allFiles] });
};
export const AllFilesPicker = async (): Promise<string[] | undefined> => {
  // Pick multiple files
  return await filesUriPicker({ type: [DocumentPicker.types.allFiles] });
};
