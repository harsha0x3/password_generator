import { useState, useCallback, useEffect, useRef } from 'react'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  /***********************************************************/

  const copyHandle = () => {
    document.querySelector('.copy').innerText = "Copied!";
    setTimeout(()=>{
      document.querySelector('.copy').innerText = "Copy";
    },2000)
  }

  /**************************************************************/

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+="

    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)  
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed])

  const copyPasswordToClipboard = ()=> {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(() => {
  generatePassword();
    
  }, [length, numAllowed, charAllowed])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />

        <buton 
        onClick = {() => {
          copyPasswordToClipboard();
          copyHandle();
        }}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer copy">Copy</buton>


      </div>
      <div className="flex text-sm gap-x-2">
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min = {6}
          max = {33}
          value = {length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          name =""
          id = ""
          />
          <label htmlFor="length">length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          className='cursor-pointer'
          onChange={() => {
            setnumAllowed((prev) => !prev)
          }}
          name =""
          id = ""
          />
          <label htmlFor="number">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          className='cursor-pointer'
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          name =""
          id = ""
          />
          <label htmlFor="charcter">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
