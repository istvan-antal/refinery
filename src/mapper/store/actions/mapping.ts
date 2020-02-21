import { createAction, ActionsUnion } from '../../../util/redux';

export const mappingActions = {
    updateMapppingCode: (code: string) => createAction('mapping/updateMapppingCode', code),
    setXAxisType: (xAxisType?: 'time') => createAction('mapping/setXAxisType', xAxisType),
};

export type MappingAction = ActionsUnion<typeof mappingActions>;