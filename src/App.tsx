import LayoutContainer from "./Layout/Layout"
import { useEffect, useRef, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { store } from "./app/store";
import { Provider } from 'react-redux'
import MainRouter from "./routes/MainRouter";
declare let CryptoJS : any ; 
import crypto from 'crypto-js/aes' ;
import { generateIdentity, generatePrivateAndPublicKey, sign, verify } from "./constants/helpers";

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const modalContainerRef = useRef();

  // const test = async ()=>{
  //   let random = Math.random()* 10;
  //   let keys = await generatePrivateAndPublicKey();
  //   console.log('public' , random  , keys.publicKey) ;
  //   console.log('private' , random , keys.privateKey);
  //   let signature =await  sign('hello', keys.privateKey);
  //   console.log('signature', random ,signature);
  //   let verify2 =  await verify(signature , keys.publicKey , 'hello');
  //   console.log('verify' , random ,verify2);
  // }
  useEffect(()=>{
    // test();
  },[])
  
  return (
    <>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
          getPopupContainer={() => modalContainerRef.current as HTMLElement}
          >
          <div ref={modalContainerRef}></div>
          <MainRouter/>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default App