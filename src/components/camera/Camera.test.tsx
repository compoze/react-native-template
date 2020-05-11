import React from 'react';
import Camera from './Camera';
import { mount } from 'enzyme';
import { simulatePress } from '../../utilities/testUtils';

describe(Camera, () => {
  it('does not call onPictureTaken until user interaction', () => {
    const onPictureTaken = jest.fn();

    mount(<Camera onPictureTaken={onPictureTaken} />);

    expect(onPictureTaken).not.toHaveBeenCalled();
  });

  it('calls onPictureTaken with the picture as base64', async () => {
    const onPictureTaken = jest.fn();
    const wrapper = mount(<Camera onPictureTaken={onPictureTaken} />);

    await simulatePress(wrapper, 'take-picture');

    expect(onPictureTaken).toHaveBeenCalledWith('base64-encoded-picture');
  });
});
