import { ReactWrapper } from 'enzyme';

export const findByTestID = (wrapper: ReactWrapper, id: string) =>
  wrapper.findWhere((node) => node.prop('testID') === id);

export const simulatePress = async (wrapper: ReactWrapper, id: string) => {
  const { onPress } = findByTestID(wrapper, id).first().props();
  return onPress();
};
