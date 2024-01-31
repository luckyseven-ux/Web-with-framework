import { useEffect, useState } from 'react';
import './App.css';
import Select from 'react-select';

function App() {
  // Deklarasi state menggunakan useState
  const [datas, setLabel] = useState([]);
  const [userselect, setuserselect] = useState("");
  const [hasil, sethasil] = useState("");

  // Fungsi async untuk mendapatkan data dari API
  const getberries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();
    
    // Mengubah data hasil dari API menjadi format yang diinginkan
    const result = value.results.map((data) => {
      return { value: data.name, label: data.name };
    });

    // Mengurutkan data dan menyimpannya ke dalam state
    setLabel(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  // Fungsi untuk mendapatkan hasil setelah tombol ditekan
  const gethasil = () => {
    console.log('data yang dipilih :' + userselect);
    
    // Mengubah state hasil menjadi negasinya (toggle)
    sethasil((state) => !state);
  };

  // Fungsi untuk mengubah state userselect saat pilihan diubah
  const handleChange = (value) => {
    setuserselect(value);
  };

  // Menggunakan useEffect untuk mendapatkan data dari API setelah komponen mount
  useEffect(() => {
    getberries();
  }, []);

  // Mengembalikan tampilan komponen
  return (
    <div className="App">
      {/* Menampilkan hasil jika state hasil adalah true */}
      <h1>{hasil ? userselect : ''}</h1>

      {/* Tombol yang memanggil fungsi gethasil */}
      <button onClick={() => gethasil()} disabled={!userselect}>
        {/* Menggunakan conditional rendering untuk label tombol */}
        {hasil ? 'Reset' : 'Print'}
      </button>

      {/* Komponen Select dari react-select */}
      <Select options={datas} onChange={(e) => handleChange(e.value)} />
    </div>
  );
}

export default App;
