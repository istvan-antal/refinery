import { MappingAction } from '../actions/mapping';

interface State {
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
    default:
        return state;
    }
};