import React, { useState } from 'react';
 
function BoardNew(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { onSave, changeInput, inputData, resetForm } = props
 
    const saveBtnClick = (e) => {
        console.log(e);
        e.preventDefault();
        const _inputData = {
            boardId: '',
            boardTitle: title,
            boardContent: content
        }
 
        onSave(_inputData);
        resetForm();
    }
 
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
 
    const handleContnet = (e) => {
        setContent(e.target.value)
    }
 
    return (
        <>
            <div width="50">
                <form onSubmit={saveBtnClick}>
                    <div>
                        제목 : <input type="text" name="boardTitle" onChange={handleTitle} value={title} />
                    </div>
                    <div>
                        내용 : <input type="text" name="boardContent"  onChange={handleContnet} value={content} />
                    </div>
                    <input type="hidden" name="boardId" onChange={changeInput} value={inputData.boardId} />
                    <button type="submit" >신규 게시글 저장</button>
                </form>
            </div>
        </>
    )
};
 
export default BoardNew;