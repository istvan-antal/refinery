/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import parseCsvFile from '../../util/parseCsvFile';
import DropZone from '../../ui/components/DropZone';
import Layout from '../../ui/components/Layout';

import 'semantic-ui-css/semantic.min.css';

const App = () => {
    const [data, setData] = useState<string[][]>([]);

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

    const header = data[0];

    const options: Options = {
        title: {
            text: 'Chart',
        },
        series: header.map((name, columnIndex) => ({
            name,
            type: 'line',
            data: data.slice(1).map(row => +row[columnIndex]),
        })),
    };

    return (
        <DropZone className="Layout" onDropFiles={onDropFiles}>
            <Layout>
                <table>
                    <thead>
                        <tr>
                            {header.map(title => (
                                <th key={title}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, y) => (
                            <tr key={y}>
                                {row.map((column, x) => (
                                    <td key={x}>{column}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Layout>
        </DropZone>
    );
};

export default App;