import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import useActions from '../../util/useActions';
import { mappingActions } from '../store/actions/mapping';
import { XAxisType } from '../store/reducers/mapping';
import useShallowEqualSelector from '../../util/useShallowEqualSelector';

const MappingCodeEditor = () => {
    const [code, setCode] = useState<string>('');
    const { updateMapppingCode, setXAxisType } = useActions(mappingActions);
    // eslint-disable-next-line no-shadow
    const xAxisType = useShallowEqualSelector(({ mapping: { xAxisType } }) => xAxisType);

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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                    onClick={() => {
                        updateMapppingCode(code);
                    }}
                >
                    Run
                </Button>
                <label>
                    X Axis type:
                    <select
                        value={xAxisType}
                        onChange={event => {
                            const { value } = event.target;
                            setXAxisType(value ? value as XAxisType : undefined);
                        }}
                    >
                        <option>Default</option>
                        <option value="time">Time</option>
                    </select>
                </label>
            </div>
        </div>
    );
};
export default MappingCodeEditor;