import mappingResultToSeries from '../mappingResultToSeries';

test('mappingResultToSeries unmapable types', () => {
    expect(mappingResultToSeries({})).toEqual([]);
});

test('mappingResultToSeries on series', () => {
    expect(mappingResultToSeries([{}])).toEqual([{}]);
});

test('mappingResultToSeries on numeric series', () => {
    expect(mappingResultToSeries([[1, 2, 3]])).toEqual([{
        data: [1, 2, 3],
    }]);
});