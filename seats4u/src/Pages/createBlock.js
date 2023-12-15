import React from 'react';
import { createBlockForShow } from '../Controller/Controller';
import { useParams } from 'react-router-dom';
import './createBlock.css';

//each block must have unique name, start row, end row, start col, end col, and price

export const CreateBlock = (e) => {
    const [blockName, setBlockName] = React.useState('');
    const [startRow, setStartRow] = React.useState('');
    const [endRow, setEndRow] = React.useState('');
    const [startCol, setStartCol] = React.useState('');
    const [endCol, setEndCol] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [section, setSection] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const { showID } = useParams(); 

    React.useEffect(() => {
        // You can access showID here
        console.log('showID:', showID);
    },[showID]);


    const handleCreateBlock = async (e) =>{
        e.preventDefault();
        try {
            // Convert price to a float
            const numericPrice = parseFloat(price.replace('$', ''));

            const response = await createBlockForShow(showID, blockName, startRow, endRow, startCol, endCol, numericPrice, section);
            console.log(response);

            if (response) {
                setSuccessMessage("Block created successfully!");
                setTimeout(() => {
                    window.location.reload();
                  }, 3000); 
            } else {
                setErrorMessage("Could not Create the Block");
            }

        } catch (error) {
            console.log(error);
            setErrorMessage("Could not create the show");
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    
        window.location.href = "/";
    }

    const backToDashHandler = () => {
        window.location.href = "/vmDashboard";
    }
    
    return(
        <main>
            <div>
            <div className = "navBar">
                <p className = "loginTrigger" onClick = {logoutHandler}> Logout</p>
                <p className = "loginTrigger" onClick = {backToDashHandler}> Back to Dashboard</p>
                <p className = "no-hover"> Seats4You </p>
            </div>

            <h1 className="blockHeader">
                Create Block
            </h1>

            <form onSubmit = {handleCreateBlock}>
                <div className = "stack">
                <label>Block Name (must be unique)</label>
                <input type="text" placeholder="blockName" onChange={(e) => setBlockName(e.target.value)} required/>
                <label>Section</label>
                <input type="text" placeholder="Section" onChange={(e) => setSection(e.target.value)} required/>
                <label>Start Row</label>
                <input type="text" placeholder="startRowNumber" onChange={(e) => setStartRow(e.target.value)} required/>
                <label>End Row</label>
                <input type="text" placeholder="endRowNumber" onChange={(e) => setEndRow(e.target.value)} required/>
                <label>Start Column</label>
                <input type="text" placeholder="startColumnNumber" onChange={(e) => setStartCol(e.target.value)} required/>
                <label>End Column</label>
                <input type="text" placeholder="endColumnNumber" onChange={(e) => setEndCol(e.target.value)} required/>
                <label>Block Price</label>
                <input type="text" placeholder="$-" onChange={(e) => setPrice(e.target.value)} required/>
                <button type="submit"> Create Block </button>
                </div>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>

            </div>
        </main>
    )
}

export default CreateBlock