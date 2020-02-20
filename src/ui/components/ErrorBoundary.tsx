import React from 'react';

interface Props {
    onErrorRender: (error: Error) => React.ReactNode;
    children: React.ReactNode;
}

interface State {
    error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    state: State = {};

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.error && prevProps !== this.props) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                error: undefined,
            });
        }
    }

    render() {
        const { error } = this.state;
        const { onErrorRender, children } = this.props;

        if (error) {
            return onErrorRender(error);
        }

        return children;
    }
}