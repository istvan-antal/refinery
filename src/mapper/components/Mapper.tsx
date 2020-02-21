/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import parseCsvFile from '../../util/parseCsvFile';
import DropZone from '../../ui/components/DropZone';
import Layout from './MapperLayout';
import useShallowEqualSelector from '../../util/useShallowEqualSelector';
import exec from '../../util/exec';
import ErrorBoundary from '../../ui/components/ErrorBoundary';
import DropBox from '../../ui/components/DropBox';
import MappingCodeEditor from './MappingCodeEditor';
import mappingResultToSeries from '../../util/mappingResultToSeries';
import getColumn from '../../util/getColumn';

const Mapper = () => {
    const [data, setData] = useState<string[][]>([]);
    const mapping = useShallowEqualSelector(state => state.mapping);

    const onDropFiles = (files: FileList) => {
        (async () => {
            for (const file of Array.from(files)) {
                setData(await parseCsvFile(file));
            }
        })().catch(error => {
            throw error;
        });
    };

    if (!data.length) {
        return (
            <DropZone onDropFiles={onDropFiles}>
                <DropBox />
            </DropZone>
        );
    }

    const header = data[0];
    const body = data.slice(1);

    const execResult = mapping.mappingCode ? exec({
        data, header, body, DateTime, column: (index: number) => getColumn(body, index),
    }, mapping.mappingCode) : undefined;

    const options: Options = {
        title: {
            text: 'Chart',
        },
        xAxis: {
            type: mapping.xAxisType === 'time' ? 'datetime' : undefined,
        },
        series: execResult ? mappingResultToSeries(execResult) : (header.map((name, columnIndex) => ({
            name,
            type: 'line',
            data: data.slice(1).map(row => +row[columnIndex]),
        }))),
        chart: {
            width: null,
            height: null,
        },
    };

    return (
        <DropZone onDropFiles={onDropFiles}>
            <Layout>
                <pre style={{ overflow: 'scroll' }}>
                    <table>
                        <thead>
                            <tr>
                                {header.map(title => (
                                    <th key={title}>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {body.slice(0, 50).map((row, y) => (
                                <tr key={y}>
                                    {row.map((column, x) => (
                                        <td key={x}>{column}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </pre>
                <ErrorBoundary onErrorRender={error => error.toString()}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </ErrorBoundary>
                <MappingCodeEditor />
                <pre style={{ overflow: 'scroll' }}>
                    <ErrorBoundary onErrorRender={error => error.toString()}>
                        <>
                            {mapping.mappingCode &&
                                JSON.stringify(execResult.slice ? execResult.slice(0, 50) : execResult, null, 4)}
                        </>
                    </ErrorBoundary>
                </pre>
            </Layout>
        </DropZone>
    );
};

export default Mapper;