import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        setText(text.toUpperCase());
        props.showAlert("Converted to Upper Case","success");
    };

    const handleLowClick = () => {
        setText(text.toLowerCase());
        props.showAlert("Converted to Lower Case","success");
    };

    const handleCapClick = () => {
        setText(text.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ')
        )
        props.showAlert("Converted to Capitalized Text","success");
    };

    const handleClearClick = () => {
        setText("");
        props.showAlert("Cleared the text","success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    }; 

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied the text","success");
    }; 

    const handleRemoveExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed the extra spaces from the text","success");
    };

    const wordCount = text => {
        const trimmedText = text.trim();
        if (trimmedText) {
            return trimmedText.split(/\s+/).length;
        }
        return 0;
    };

    const [text,setText] = useState('Enter text here');
    
    return (
        <>
        <div className='container my-1'>
            <h1 className='mb-4'>{props.heading} </h1>
            <div className="mb-3">
                <textarea className="form-control" value = {text}  onChange = {handleOnChange} style = {{backgroundColor : props.mode === `dark` ? `#021529` : `white` , color : props.mode === `dark` ? `white` : `black`}} id="myBox" rows="10"></textarea>
            </div>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleLowClick}>Convert to Lowercase</button>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleCapClick}>Capitalize the Text</button>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleCopy}>Copy Text</button>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</button>
            <button disabled = {text.length === 0} className="btn btn-primary my-4 mx-3" onClick={handleClearClick}>Clear Text</button>
        </div>
        <div className="container my-3">
            <h2>Your text summary</h2>
            <p> {wordCount(text)} {wordCount(text) === 0 || wordCount(text) === 1 ? `word` : `words`} and {text.length} characters</p>
            <p>{0.008 * wordCount(text)} Minutes to read</p>
            <h2>Preview</h2>
            <p>{wordCount(text) === 0 ? `Nothing to Preview!` : text}</p>
        </div>
        </>
    )
}
