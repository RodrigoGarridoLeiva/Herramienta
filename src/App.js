import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 

// aqui

/*
function initWebViewer(options) {
  console.log(options);

  var myObj = {
    libUrl: options.lib,
    fullAPI: true,
    namespacePrefix: '',
  };
  var resourceConfig = options.myfiles + '/config.js';

  WebViewer(
    {
      path: options.lib,
      custom: JSON.stringify(myObj),
      config: resourceConfig,
      fullAPI: myObj.fullAPI,
      // initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    },
    document.getElementById('viewer')
  ).then(instance => {
    console.log(instance);
    instance.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf')
    // Use WebViewer API here
  })
}



*/
// aqui





  useEffect(() => { 
    
    
    WebViewer( 
      {
        fullAPI: true,
        path: '/webviewer/lib',
        initialDoc: '/files/Home.pdf',
        showLocalFilePicker: true,
      },
      viewer.current,
    )
    .then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      docViewer.on('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation();
        rectangleAnnot.PageNumber = 1;
        // values are in page coordinates with (0, 0) in the top left
        rectangleAnnot.X = 100;
        rectangleAnnot.Y = 150;
        rectangleAnnot.Width = 200;
        rectangleAnnot.Height = 50;
        rectangleAnnot.Author = annotManager.getCurrentUser();

        annotManager.addAnnotation(rectangleAnnot);
        annotManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">Herramienta de Escritura</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
