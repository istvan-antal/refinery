/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import parseCsvFile from '../../util/parseCsvFile';
import DropZone from '../../ui/components/DropZone';
import Layout from '../../ui/components/Layout';

import 'semantic-ui-css/semantic.min.css';
import useShallowEqualSelector from '../../util/useShallowEqualSelector';
import useActions from '../../util/useActions';
import { mappingActions } from '../store/actions/mapping';
import exec from '../../util/exec';
import ErrorBoundary from '../../ui/components/ErrorBoundary';

const Mapper = () => {
    const [data, setData] = useState<string[][]>([]);
    const mapping = useShallowEqualSelector(state => state.mapping);
    const { updateMapppingCode } = useActions(mappingActions);

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
            <DropZone className="Layout" onDropFiles={onDropFiles}>
                Drag and drop a .csv file to start analyzing.
            </DropZone>
        );
    }

    const execResult = mapping.mappingCode ? exec({ data }, mapping.mappingCode) : undefined;

    const header = data[0];
    const options: Options = {
        title: {
            text: 'Chart',
        },
        series: execResult ? execResult.map((item: { name?: string; data?: []; type?: string }) => ({
            ...item,
        })) : (header.map((name, columnIndex) => ({
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
                            {data.slice(1, 50).map((row, y) => (
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
                <textarea
                    value={mapping.mappingCode}
                    onChange={event => {
                        updateMapppingCode(event.target.value);
                    }}
                />
                <pre style={{ overflow: 'scroll' }}>
                    <ErrorBoundary onErrorRender={error => error.toString()}>
                        <>
                            {mapping.mappingCode &&
                                JSON.stringify(execResult.slice ? execResult.slice(50) : execResult, null, 4)}
                        </>
                    </ErrorBoundary>
                </pre>
            </Layout>
        </DropZone>
    );
};

export default Mapper;