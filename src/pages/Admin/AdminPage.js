import React, { useState } from 'react';
import './AdminPage.css'; 
import Motto from '../../Components/Motto/motto';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';  

const AdminPage = () => {
  const [data, setData] = useState([]); 
  const [query, setQuery] = useState(''); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');  
  };
  const fetchData = (query) => {
    fetch(`http://localhost/admin.php?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error); 
          setData([]);
        } else {
          setData(data); 
          setError(null);
        }
      })
      .catch((err) => {
        setError('Błąd połączenia z serwerem');
        setData([]);
      });
  };

  const handleButtonClick = (tableName) => {
    fetch(`http://localhost/admin.php?table=${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setData([]);
        } else {
          setData(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Błąd połączenia z serwerem');
        setData([]);
      });
  };

  const handleViewClick = (viewName) => {
    fetch(`http://localhost/admin.php?view=${viewName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setData([]);
        } else {
          setData(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Błąd połączenia z serwerem');
        setData([]);
      });
  };

  const renderTable = () => {
    if (data.length === 0) {
      return <div className="noData">Brak danych do wyświetlenia.</div>;
    }

    return (
      <table className="table">
        <thead>
          <tr className="tableHeader">
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="tableRow">
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="tableData">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Fuse - Panel administratora SQL</title>
      </Helmet>
      <Motto/>
      <div className="container">
      <button className='Logout-button'onClick={goHome}>Wyloguj się</button>
        <h1 className="header">Panel Administratora | SQL</h1>
        <div className="buttonsContainer">
          <button className="button" onClick={() => handleButtonClick('uzytkownicy')}>Użytkownicy</button>
          <button className="button" onClick={() => handleButtonClick('posty')}>Posty</button>
          <button className="button" onClick={() => handleButtonClick('komentarze')}>Komentarze</button>
          <button className="button" onClick={() => handleButtonClick('filmiki')}>Filmiki</button>
          <button className="button" onClick={() => handleButtonClick('rozmowy')}>Rozmowy</button>
          <button className="button" onClick={() => handleButtonClick('wiadomosci')}>Wiadomosci</button>
          <button className="button" onClick={() => handleButtonClick('obserwujacy')}>Obserwujacy</button>
          <button className="button" onClick={() => handleButtonClick('znajomi')}>Znajomi</button>
        </div>
        <div className="buttonsContainer">
         <p>WIDOKI</p>
          <button className="button" onClick={() => handleViewClick('aktywnosc_uzytkownikow')}>Widok  Użytkownicy</button>
          <button className="button" onClick={() => handleViewClick('komentarze_z_postami')}>Widok Posty</button>

          <button className="button" onClick={() => handleViewClick('5_uzytkow_z_najwieksza_iloscia_obserwacji')}>Widok  5 Największych obserwacji</button>
          <button className="button" onClick={() => handleViewClick('najbardziej_polubiane_komentarze')}>Widok Najbardziej polubianych komentarzy</button>
          <button className="button" onClick={() => handleViewClick('wiadomosci_niewyslane')}>Widok  Wiadomosci niewyslane</button>
          <button className="button" onClick={() => handleViewClick('widok_top_10_posty')}>Widok TOP 10 Postow</button>
          <button className="button" onClick={() => handleViewClick('najwiecej_hasztagow')}>Najpopularniejsze Hasztagi</button>
          <button className="button" onClick={() => handleViewClick('znaj')}>Widok Znaj</button>
        </div>

        <div className="queryContainer">
          Zapytanie  SQL
          <textarea
            className="queryInput"
            placeholder="Wpisz zapytanie SQL..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="button queryButton"
            onClick={() => fetchData(query)}
          >
            Wykonaj zapytanie SQL
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="tableStructure">
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
