import { createAction } from '../redux';

test('createAction with parameter', () => {
    expect(createAction('test', 'test')).toMatchSnapshot();
});

test('createAction without parameter', () => {
    expect(createAction('test')).toMatchSnapshot();
});