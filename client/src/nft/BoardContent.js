import React from 'react';
 
function BoardContent() {
 
    const boardId_temp = decodeURI(window.location.href).split('http://localhost:3000/BoardContent/').reverse()[0];
    const boardId = boardId_temp.split('/')[0];
 
    const boardTitle_temp = decodeURI(window.location.href).split(`http://localhost:3000/BoardContent/${boardId}/`).reverse()[0];
    const boardTitle = boardTitle_temp.split('/')[0];
 
    const boardContent_temp = decodeURI(window.location.href).split(`http://localhost:3000/BoardContent/${boardId}/${boardTitle}/`).reverse()[0];
    const boardContent = boardContent_temp.split('/')[0];
    
    return (
        <div>
            <table border="1">
                <tbody>
                    <tr align="center">
                        <td width="50">{boardId}</td>
                        <td width="300">{boardTitle}</td>
                    </tr>
                    <tr>
                        <td colspan="2" width="350">{boardContent}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
 
export default BoardContent;