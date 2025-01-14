import { useState, useCallback, useEffect, useRef } from "react";
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [caseAllowed, setCaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  /***********************************************************/

  const copyHandle = () => {
    document.querySelector(".copy").innerText = "Copied!";
    setTimeout(() => {
      document.querySelector(".copy").innerText = "Copy";
    }, 2000);
  };

  /**************************************************************/

  const passwordRef = useRef(null);

  let str = "abcdefghijklmnopqrstuvwxyz";
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let nums = "0123456789";
  let chars = "!@#$%^&*()_+=";

  const generatePassword = useCallback(() => {
    let pass = "";
    if (caseAllowed) str += upper;
    if (numAllowed) str += nums;
    if (charAllowed) str += chars;

    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, caseAllowed]);

  const getChar_class = (char) => {
    if (upper.includes(char)) return "text-yellow-500";
    if (nums.includes(char)) return "text-blue-500";
    if (chars.includes(char)) return "text-red-500";
    return "text-white";
  };

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, caseAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <div className="outline-none w-full py-1 px-3">
          {password.split("").map((char, index) => (
            <span key={index} className={getChar_class(char)}>
              {char}
            </span>
          ))}
        </div>

        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className="hidden"
        />

        <button
          onClick={() => {
            copyPasswordToClipboard();
            copyHandle();
          }}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer copy"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={33}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={() => {
              setnumAllowed((prev) => !prev);
            }}
            name=""
            id=""
          />
          <label htmlFor="number">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={() => {
              setCaseAllowed((prev) => !prev);
            }}
            name=""
            id="mixedcase"
          />
          <label htmlFor="mixedcase">Mixed Case</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            name=""
            id=""
          />
          <label htmlFor="charcter">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
