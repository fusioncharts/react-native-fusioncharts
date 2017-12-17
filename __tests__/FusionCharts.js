import 'react-native';
import React from 'react';
import FusionCharts from '../src/FusionCharts';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <FusionCharts />
    );
});
