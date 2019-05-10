import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

class MyEditor extends React.Component {
    editorStyles = {
        'width':'200px',
        'margin':'10px',
        'border':'1px solid gray'
    };
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState});
    }
    handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    renderContentAsRawJson() {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        return JSON.stringify(raw, null, 2);
    }
    render() {
        return (
            <div>
                <div style={{ 'margin': '10px' }}>
                    <button onClick={() => this.handleKeyCommand("bold")}>Bold</button>
                    <button onClick={() => this.handleKeyCommand("italic")}>Italic</button>
                    <button onClick={() => this.handleKeyCommand("underline")}>Underline</button>
                    <button onClick={() => this.handleKeyCommand("code")}>Code</button>
                </div>
                <div style={this.editorStyles}>
                    <Editor 
                        editorState={this.state.editorState} 
                        onChange={this.onChange} 
                        handleKeyCommand={this.handleKeyCommand.bind(this)} 
                    />
                </div>
                <div>
                    <pre>
                        {this.renderContentAsRawJson()}
                    </pre>
                </div>
            </div>
        );
    }
}

export default MyEditor;