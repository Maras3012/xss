import React from 'react';
import { useState } from 'react';
import Switch from 'react-input-switch';
import './App.css';

const App = () => {
  //XSS part
  const [value, setValue] = useState('');
  const [onOff, setOnOff] = useState(0);
  const [data, setData] = useState(
    `<h3>This is a blog title </h3><p>This is some blog text. There could be <b>bold</b> elements as well as <i>italic</i> elements here! <p>`
  );
  //`<img src=??? onerror="alert('XSS')" />`
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    if (onOff === 0) {
      setData(value);
    } else {
      //pokusao sam sa pametnijim nacinima ali iz nekog razloga nije radilo a ovakva implementacija iako vrlo jednostavna obavlja svoju svrhu jer bez < i > nema ni html tag-ova
      setData(value.replace(/<[^>]+>/g, ''));
    }

    console.log(onOff);
  };

  return (
    <div>
      <div className="center_div1">
        <h1>XSS vulnerability</h1>
        <h3>Protection</h3>
        <Switch
          style={{ scale: '2', marginLeft: '20px' }}
          value={onOff}
          onChange={setOnOff}
        />
        <div className="center_input">
          <input
            style={{ width: '100%' }}
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={value}
          />
        </div>
        <div>
          <button onClick={handleClick}>Attack</button>
        </div>
        <div
          style={{ padding: '10px', fontSize: '17px', textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  );
};
export default App;
