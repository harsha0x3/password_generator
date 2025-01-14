import React from "react";
import { useState } from "react";

function Junk() {
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const b_text = show ? "Hide" : "Show";

  const handle = () => {
    setShow(!show);
  };

  const Color_pass = () => {
    return (
      <div>
        {password.split("").map((char, index) => (
          <span key={index} style={{ color: index % 2 === 0 ? "red" : "blue" }}>
            {char}
          </span>
        ))}
      </div>
    );
  };
  return (
    <>
      <label htmlFor="pass">pass</label>
      <input
        type="text"
        onChange={(e) => setpassword(e.target.value)}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        id="pass"
      />
      <button className="bg-green-600" onClick={handle}>
        {b_text}
      </button>
      {show && <Color_pass />}
    </>
  );
}

export default Junk;
