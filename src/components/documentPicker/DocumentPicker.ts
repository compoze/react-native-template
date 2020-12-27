import { filesUriPicker, fileUriPicker } from './PickerRoot';
export const DocumentPicker = async (): Promise<string | undefined> => {
  // Pick a single file
  return await fileUriPicker({
    type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
  });
};
export const DocumentsPicker = async (): Promise<string[] | undefined> => {
  // Pick multiple files
  return await filesUriPicker({
    type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
  });
};
