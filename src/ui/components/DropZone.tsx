import React from 'react';
import './DropZone.scss';

interface Props {
    className?: string;
    onDragEnter?(): void;
    onDragLeave?(): void;
    onDropFiles(files: FileList): void;
}

export default class DropZone extends React.Component<Props> {
    private root?: HTMLDivElement;
    onDragEnter = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const { onDragEnter } = this.props;

        if (onDragEnter) {
            onDragEnter();
        }
    };

    onDragLeave = (event: DragEvent) => {
        const { onDragLeave } = this.props;

        if (onDragLeave) {
            onDragLeave();
        }

        event.preventDefault();
        event.stopPropagation();
    };

    onDropFiles = (event: DragEvent) => {
        const { onDropFiles } = this.props;

        if (event.dataTransfer && event.dataTransfer.files.length) {
            onDropFiles(event.dataTransfer.files);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    onRootNode = (node: HTMLDivElement) => {
        if (!node) {
            this.root = undefined;
            return;
        }

        const { onDragEnter, onDragLeave, onDropFiles } = this;

        this.root = node;

        node.addEventListener('dragenter', onDragEnter, false);
        node.addEventListener('dragover', event => {
            event.preventDefault();
        }, false);
        node.addEventListener('dragleave', onDragLeave, false);
        node.addEventListener('drop', onDropFiles, false);
    };

    render() {
        const { className, children } = this.props;
        const { onRootNode } = this;

        return (
            <div
                className={className === undefined ? 'DropZone' : className}
                ref={onRootNode}
            >
                {children}
            </div>
        );
    }

    componentWillUnmount() {
        if (this.root) {
            const { onDragEnter, onDragLeave, onDropFiles } = this;

            this.root.removeEventListener('dragenter', onDragEnter);
            this.root.removeEventListener('dragleave', onDragLeave);
            this.root.removeEventListener('drop', onDropFiles);

            this.root = undefined;
        }
    }
}