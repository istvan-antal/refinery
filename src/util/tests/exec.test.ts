import exec from '../exec';

test('exec', () => {
    expect(exec({ data: [] }, 'data')).toEqual([]);
});

test('exec with error', () => {
    expect(exec({ data: [] }, '[')).toMatchSnapshot();
});