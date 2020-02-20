import { useSelector, shallowEqual } from 'react-redux';
import { State } from '../main/store';

type Selector<T> = (state: State) => T;

const useShallowEqualSelector = <D>(selector: Selector<D>) => useSelector<State, D>(selector, shallowEqual);

export default useShallowEqualSelector;