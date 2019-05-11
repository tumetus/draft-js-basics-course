import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

class DisplayEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    loadContent() {
        const savedData = localStorage.getItem('DraftEditorContentJson');
        return savedData ? JSON.parse(savedData) : null;
    }
    setEditorContent() {
        const rawEditorData = this.loadContent();
        if (rawEditorData !== null) {
            const contentState = convertFromRaw(rawEditorData);
            const newEditorState = EditorState.createWithContent(contentState);
            this.setState({ editorState: newEditorState });
        } else {
            this.setState({ editorState: EditorState.createEmpty() });
        }
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setEditorContent()}>Load content</button>
                </div>
                <Editor
                    editorState={this.state.editorState}
                    readOnly={true}
                />
            </div>
        );
    }
}

export default DisplayEditor;