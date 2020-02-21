/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button } from 'semantic-ui-react';
import parseCsvFile from '../../util/parseCsvFile';
import DropZone from '../../ui/components/DropZone';
import Layout from './MapperLayout';

import 'semantic-ui-css/semantic.min.css';
import useShallowEqualSelector from '../../util/useShallowEqualSelector';
import useActions from '../../util/useActions';
import { mappingActions } from '../store/actions/mapping';
import exec from '../../util/exec';
import ErrorBoundary from '../../ui/components/ErrorBoundary';
import DropBox from '../../ui/components/DropBox';

const MappingCodeEditor = () => {
    const [code, setCode] = useState<string>('');
    const { updateMapppingCode } = useActions(mappingActions);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <textarea
                style={{ flexGrow: 1 }}
                value={code}
                onChange={event => {
                    setCode(event.target.value);
                }}
                placeholder={`[
    {
        name: header[1],
        data: body.map(row => +row[1]),
    }
]`}
            />
            <Button
                onClick={() => {
                    updateMapppingCode(code);
                }}
            >
                Run
            </Button>
        </div>
    );
};

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

    const execResult = mapping.mappingCode ? exec({ data, header, body }, mapping.mappingCode) : undefined;

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