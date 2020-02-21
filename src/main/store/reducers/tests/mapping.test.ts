import { mapping } from '../mapping';
import { mappingActions } from '../../actions/mapping';

test('mapping with generic action and default state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(mapping(undefined, { type: 'test' } as any)).toMatchSnapshot();
});

test('mapping updateMapppingCode', () => {
    expect(mapping({}, mappingActions.updateMapppingCode('data'))).toMatchSnapshot();
});