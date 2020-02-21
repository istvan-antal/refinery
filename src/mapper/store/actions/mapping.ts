import { createAction, ActionsUnion } from '../../../util/redux';

export const mappingActions = {
    updateMapppingCode: (code: string) => createAction('mapping/updateMapppingCode', code),
};

export type MappingAction = ActionsUnion<typeof mappingActions>;