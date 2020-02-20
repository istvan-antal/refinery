import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

type FunctionType = (...args: any[]) => any;
interface ActionCreatorMapObject { [actionCreator: string]: FunctionType }

// type UseActionsObject = (actions: ActionCreatorMapObject, deps: any[]) => ActionCreatorMapObject;
// type UseActionsArray = (actions: FunctionType[], deps: any[]) => FunctionType[]

// type UseActions = UseActionsObject | UseActionsArray;

const useActions = <T extends ActionCreatorMapObject>(actions: T, deps: any[] = []): T => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(actions, dispatch), deps ? [dispatch, ...deps] : [dispatch]);
};

export default useActions;