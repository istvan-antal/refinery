const mappingResultToSeries = (result: {}) => {
    if (Array.isArray(result)) {
        return result.map(series => {
            if (Array.isArray(series)) {
                return {
                    data: series,
                };
            }
            return series;
        });
    }
    return [];
};

export default mappingResultToSeries;