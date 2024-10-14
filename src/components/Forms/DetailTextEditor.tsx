
import React, { useEffect, useState } from 'react';
import  {Editor}  from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


interface Props {
  label?:string;
  value?: string;
}

export const DetailTextEditor = ({ label, value}:Props) => {

  const [editorState,setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(value??"");
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditorState(EditorState.createWithContent(contentState));
    
  },[value]);
   

  return (
    <div className='main-editor-container'>  
      {label && <label className="form-label m-0 w-100" ><b>{label}</b></label>}
      <Editor
        editorState={editorState}
        toolbarClassName="_toolbarClassName"
        wrapperClassName="_wrapperClassName mt-2"
        editorClassName="_editorClassName tiny-scroll"
        onEditorStateChange={(_editorState) => setEditorState(_editorState)}
        readOnly={true}
        toolbarHidden={true}
      />
    </div>
  );
}

export default DetailTextEditor;