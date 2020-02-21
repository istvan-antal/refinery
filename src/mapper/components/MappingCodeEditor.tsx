import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import useActions from '../../util/useActions';
import { mappingActions } from '../store/actions/mapping';

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
                placeholder={`Available variables:

 * data - full CSV data
 * header - header of CSV
 * body - body of CSV

Available APIs:
 * column(index) - returns a column of numeric data from the body
 * DateTime (luxon)


examples:

[
    {
        name: header[1],
        data: column(1),
    }
]

[
    {
        name: header[1],
        data: body.map(row => +row[1]),
    }
]



[
    body.map(row => [
        DateTime.fromISO(row[0]).toMillis(),
        +row[1],
    ]),
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
export default MappingCodeEditor;