
import { useEffect, useState } from 'react';
import "./FormatedTextEditor.scss";
import  { Editor }  from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { FormikErrors } from 'formik';

interface Props {
  defaultValue?: string;
  onChange?: Function;
  name?: string;
  setFieldValue?: Function;
  errors?: FormikErrors<any>;
  label?: string;
  required?: boolean
}

const FormatedTextEditor = ({
  defaultValue,
  onChange,
  name,
  setFieldValue,
  errors,
  label,
  required} : Props) => {

  const [editorState,setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if(defaultValue){
      const blocksFromHtml = htmlToDraft(defaultValue);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
    
  },[]);

  useEffect (() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    if(typeof onChange == 'function') onChange(markup);
    if(typeof setFieldValue == 'function' && typeof name == 'string') setFieldValue(name,markup);
 
  },[editorState]);
   

  return (
    <div className='text-editor-container'>  
      <label className="form-label m-0 w-100" htmlFor={name} >{label} {required && <span className=" text-danger">*</span>}</label>
      <Editor
        // localization={{
        //   locale: 'fr',
        // }}
        editorState={editorState}
        toolbarClassName="text-editor-toolbar"
        wrapperClassName="text-editor-wrapper mt-2"
        editorClassName="text-editor-content tiny-scroll"
        onEditorStateChange={(_editorState : any) => setEditorState(_editorState)}
      />
    </div>
  );
}

export default FormatedTextEditor;