import React from 'react';
import './App.css';
import pdfData from './pdf-data.json';

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function checkEdge() {
    return window.navigator.userAgent.indexOf("Edge") > -1;
}

function App() {
    // React.useEffect(() => {
    //     objectRef.current.setAttribute('data', pdfData.url);
    // }, []);
    const [blob, setBlob] = React.useState(null);

    React.useEffect(()=> {
        setBlob(dataURLtoBlob(pdfData.url));
    }, []);

    const isEdge = checkEdge();

  return (
    <div className="App">
    <h1>App title</h1>
    <p>Lorem ipsum</p>
    {
        !isEdge &&
        <>
            <object data={pdfData.url} type="application/pdf" className="App__pdf-viewer"><p></p>
                <iframe src={pdfData.url} width="100%" height="400" style={{border: 'none'}} title="PDF">
                    <p>Your browser does not support PDFs.
                    <a href={pdfData.url}>Download the PDF</a>.</p>
                </iframe>
            </object>
        </>
    }
    {
        blob && isEdge && <a href={window.URL.createObjectURL(blob)} download="downloaded-file.pdf">Download</a>
    }
    </div>
  );
}

export default App;
