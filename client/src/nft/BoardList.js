import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
 
import { boardRemove } from './BoardReducer.js';
import {useDispatch, useSelector} from 'react-redux';
 
function BoardList() {
 
    const dispatch = useDispatch();
 
	// 삭제 버튼 클릭 시 action 에 dispatch 해줌
    const onRemove = (boardId) => dispatch(boardRemove(boardId));
 
    // 현재 store 에 있는 board field 를 구독
    const {boards} = useSelector(state => state.boardReducer);
 
    return (
        <div>
            <table border="1">
                <tbody>
                    <tr align="center">
                        <td width="50">번호</td>
                        <td width="100">제목</td>
                        <td width="200">내용</td>
                    </tr>
                    {boards.map(row =>(  
                      <tr>
                          <td><Link to={`/BoardContent/${row.boardId}/${row.boardTitle}/${row.boardContent}`}>{row.boardId}</Link></td>
                          <td><Link to={`/BoardContent/${row.boardId}/${row.boardTitle}/${row.boardContent}`}>{row.boardTitle}</Link></td>
                          <td><Link to={`/BoardContent/${row.boardId}/${row.boardTitle}/${row.boardContent}`}>{row.boardContent}</Link></td>
                          <td><button onClick={() => onRemove(row.boardId)}>삭제</button></td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
 
export default BoardList;