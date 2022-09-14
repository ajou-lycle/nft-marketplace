import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
 
function NftEditButton() {
    return (
        <div>
        <button>
            <Link to='/'>
                Home
            </Link>
        </button>

                <button>
                <Link to='/BoardNew'>
                    Write
                </Link>
            </button>
            
            </div>
        
    );
}
 
export default NftEditButton;