import Bar from './Bar.js';
import Pie from './PieChart.js';
import '../Styles/Performance-Admin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Performance = () => {
    const [searchText, setSearchText] = useState('');
    const [stdList, setStdList] = useState([]);
    const [filteredStdList, setFilteredStdList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await axios.get("http://localhost:4000/admin/student", { withCredentials: true });
            setStdList(response.data);
            //setFilteredStdList(response.data);
          } catch (err) {
            alert(err);
          }
        };
        fetchStudents();
      }, []);

      const handleSearch = () =>{
        const FilteredStdList =  stdList.filter((std)=>std.username.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredStdList(FilteredStdList)
      }
      

      const handleKeyDown = (event) => {   //function so that when i click enter , it automatically cl
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    return (
        <>
        <div className='search-bar-container'>
            <input type="text" placeholder="Search" className='search-bar' value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}/>   {/* to listen to the enter key*/}
            <button className='search-button'
            onClick={() =>{handleSearch()}}>Search</button>
        </div>
            <h2 className='Heading'> {filteredStdList.length > 0 ? filteredStdList[0].username+"'s " : ''}Performance</h2>
            <div className='Performance'> 
                <Bar score = { filteredStdList.length > 0 ? filteredStdList[0].score : [] } />
                <Pie className='PieChart'  attendance = { filteredStdList.length > 0 ? filteredStdList[0].attendance : {} } />
            </div>
        </>
    )
}

export default Performance