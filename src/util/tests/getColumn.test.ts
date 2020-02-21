import getColumn from '../getColumn';

test('getColumn', () => {
    expect(getColumn([[1, 2], [3, 4]], 1)).toEqual([2, 4]);
});