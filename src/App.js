import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import './App.css';
import Swal from 'sweetalert2';

function App() {
  const [valueurl, setValue] = useState('');
  const canvasRef  = useRef();

  const downloadQRCode = () => {
    const randNum=new Date().toISOString().replace(/[-:T.]/g, '')
    const svg = canvasRef.current.children[0];
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = randNum+'.png';
      downloadLink.click();
      Swal.fire({
        title: "Good job!",
        text: "Thanks for downloading...",
        icon: "success"
      });

    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const QRCodefn = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="text-center">
          <h2>QR Code Generator</h2>
        </div>
        <div className="form-horizontal">
          <div className="form-group row ">
            

            <div className="col-sm-6 width100">
              <input
                type="text"
                className="form-control"
                id="content"
                placeholder="Enter content"
                onChange={QRCodefn}
              />
            </div>
          </div>
        </div>
        <div
          style={{ height: 'auto', margin: '0 auto', maxWidth: 256, width: '100%' }}
          ref={canvasRef} className='mt-2'
        >
          {valueurl && (
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={valueurl}
              viewBox={`0 0 256 256`}
            />
          )}
        </div>
        {valueurl && (
            <div className='text-center'>
              <button onClick={downloadQRCode} className='btn btn-info mt-2 ' disabled={!valueurl}>
            Download QR Code
          </button>
            </div>
          )}

       
      </div>
    </div>
  );
}

export default App;
