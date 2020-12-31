import { filesUriPicker, fileUriPicker } from './PickerRoot';

export const DocumentPicker = async (): Promise<string> => {
  // Pick a single file
  return await fileUriPicker({
    type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
  }).then((str) => str);
};
export const DocumentsPicker = async (): Promise<string[]> => {
  // Pick multiple files
  return await filesUriPicker({
    type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
  }).then((str) => str);
};
