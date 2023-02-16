import React from 'react';
import logo from './logo.svg';
import './App.css';
import piexifjs from 'piexifjs';

function App() {
  const handleFileSelect = (evt) => {
    var f = evt.target.files[0]; // FileList object
    if (!f.type.match("image/jpeg.*")) {
      return;
    }
    console.log("SUMANTA --- ", URL.createObjectURL(f))
    var reader = new FileReader();
    reader.onloadend = function (e) {
      var exifImage = piexifjs.load(e.target.result);
      console.log("Exif Data ------",exifImage);
      var removedExifImage = piexifjs.remove(e.target.result);
      console.log("Removed Exif ------",removedExifImage,"*******",piexifjs.load(removedExifImage));

      // fetch(removedExifImage).then(res => res.blob()).then(blob => {
      //   console.log("SUMANTA *****",blob);
      //   let objectURL = URL.createObjectURL(blob);
      //   console.log("SUMANTA ***** URL ****",objectURL);
      //   let myImage = new Image();
      //   myImage.src = objectURL;
      //   document.getElementById('myImg').appendChild(myImage)
      // })
      
      var str = atob(removedExifImage.split(",")[1]);
      var data = [];
      for (var p = 0; p < str.length; p++) {
        data[p] = str.charCodeAt(p);
      }
      var ua = new Uint8Array(data);
      var blob = new Blob([ua], { type: "image/jpeg" });
      var image = new Image();
      image.src = URL.createObjectURL(blob);
      image.width = 200;
      document.getElementById('myImg').appendChild(image)
    };
    reader.readAsDataURL(f);
  };
  return (
    <div className="App">
      <header className="App-header">
      <input type="file" id="files" className="form" onChange={handleFileSelect} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="myImg"></div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
