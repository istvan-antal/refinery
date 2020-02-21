import { MappingAction } from '../actions/mapping';

export type XAxisType = 'time';

interface State {
    xAxisType?: XAxisType;
    mappingCode?: string;
}

const defaultState: State = {};

export const mapping = (state = defaultState, action: MappingAction) => {
    switch (action.type) {
    case 'mapping/updateMapppingCode':
        return {
            ...state,
            mappingCode: action.payload,
        };
    case 'mapping/setXAxisType':
        return {
            ...state,
            xAxisType: action.payload,
        };
    default:
        return state;
    }
};