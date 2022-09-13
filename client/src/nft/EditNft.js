import {React,useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
 
import BoardList from './BoardList.js';
import BoardNew from './BoardNew.js';
import BoardContent from './BoardContent.js';
 
// import HomeButton from '@components/HomeButton';
// import WriteButton from '@components/WriteButton';
 import NftEditButton from './NftEditButton.js';
 import { useDispatch, useSelector } from 'react-redux';
import { boardSave } from './BoardReducer.js';

function EditNft() {


    // State
    let [inputData, setInputData] = useState({
        boardId: '',
        boardTitle: '',
        boardContent: ''
    });
 
    const dispatch = useDispatch();
 
	// 글 작성 페이지에서 onSave 를 호출하면 action 에 dispatch 됨
    const onSave = (saveData) => dispatch(boardSave(saveData));
 
	// 글 작성 페이지에서 input value 값이 변할 때마다 값 변경
    const changeInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
	
    // 글 작성 페이지에서 save 버튼 클릭 시 input 란 reset
    const resetForm = () => {
        setInputData({
            boardId: '',
            boardTitle: '',
            boardContent: ''
        })
    }


    return (
        <div>
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path='/BoardList' exact component={BoardList}/>
                    <Route path='/BoardNew'                     	   exact 
                           component={() => 
                           		<BoardNew onSave={onSave} 
                                		  inputData={inputData} 
                                          changeInput={changeInput} 
                                          resetForm={resetForm}  
                                 />
                            } 
                    />
                    <Route path='/BoardContent' component={BoardContent} />
                    </Routes>
                </BrowserRouter>
            </div>
            <div>
                <NftEditButton />
            </div>
        </div>
    );
}
 
export default EditNft;