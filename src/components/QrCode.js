import { useState, useEffect } from 'react';
import { TOTP } from 'otpauth';
import QRCode from 'qrcode';
import qrCodeReader from 'qrcode-reader';
import img from './logo.png';
const QRCodeDecoder = () => {
  const [imageUrl, setImageUrl] = useState(img);
  const [decodeData, setDecodeData] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
  }, [imageUrl, decodeData]);

  const [file, setFile] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setDecodeData('');
  };
  //const secret1 = Secret.fromRandom();
  // const totp1 = new TOTP({
  //   issuer: 'My App',
  //   label: 'user@example.com',
  //   algorithm: 'SHA1',
  //   digits: 6,
  //   period: 30,
  //   secret: "secret",
  // });

  // const otpauthUrl = totp1.toString();
  // const QRGenerate = () => {
  //   QRCode.toDataURL(otpauthUrl, (err, imageUrl) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       setImgUrl(imageUrl);
  //     }
  //   });
  // }

  const decodeHandler = () => {
    const qr = new qrCodeReader();
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      qr.decode(imageData);
      const result = qr.result;
      setDecodeData(result.result);
    };
  }

  return (
    <div>
      <div className='img-contant'>
        <header>
          <h1>Upload your image</h1>
          <p>File should be Jpeg, Png,...</p>
        </header>
        <div>
          <label htmlFor="file-input" className='fileload'>Select an image file</label>
          <input type="file" id="file-input" accept="image/*" 
          onChange={handleFileUpload} />
        </div>
        <div className='img-uploader'>
          {imageUrl && 
          <img src={imageUrl} alt="Selected Image" />}
        </div>
        <div>
          <button type="button" id="file-docode" onClick={decodeHandler} className='fileload'>Decode</button>
        </div>
        <textarea value={decodeData} readOnly className='textarea'></textarea>
      </div>
    </div>
  );
};
export default QRCodeDecoder;