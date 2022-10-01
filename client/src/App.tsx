import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';
import { TState } from './types';
import classes from './styles.module.css';

function App() {
  const [value, setValue] = useState<TState>({
    name: '',
    price: '',
    receiptId: '',
    tax: '',
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

   const createAndDownloadPdf = () => {
    axios.post('/create-pdf', value)
      .then((response) => {
        console.log(response, '=> response');
        return axios.get('get-pdf', { responseType: 'blob' })
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        console.log(pdfBlob, '=> pdfBlob');
        saveAs(pdfBlob, 'newPdf.pdf');
      })
      .catch((err) => {
        console.error(err);
      })
  };

  return (
    <div className="App">
      <div className={classes.wrapper}>
        <input className={classes.input} type="text" placeholder="Name" name="name" onChange={handleChange}/>
        <input className={classes.input} type="text" placeholder="Receipt" name="receiptId" onChange={handleChange} />
        <input className={classes.input} type="number" placeholder="Price" name="price" onChange={handleChange} />
        <input className={classes.input} type="number" placeholder="Tax" name="tax" onChange={handleChange} />
      </div>
      <div className={classes.button}>
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    </div>
  );
}

export default App;
