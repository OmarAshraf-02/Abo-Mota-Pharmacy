import Accordion from "../../../shared/components/Accordion";
import { medicines } from "../../../shared/assets/mockdata";
import { useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";
import FilterButton from "../../../shared/components/FilterButton";
import { medicinalUses } from "../../../shared/assets/mockdata";
import Button from '../../../shared/components/Button';
import {AiOutlinePlus} from 'react-icons/ai';

import './styles.css';
import Header from "../../../shared/components/Header";
import { Link } from "react-router-dom";
const MedicineScreen = ({isPharmacist = false}) => {
  const [medicineArray] = useState(medicines);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filteredArray = medicineArray.filter((medicine) => {
    return medicine.name.toLowerCase().includes(search.toLowerCase()) && medicine.extras.medicinalUse.includes(filter);
  });
  const mappedArray = filteredArray.map((medicine, index) => {
    return <Accordion isPharmacist = {isPharmacist} key={index} label={medicine.name} subLabel={medicine.description} price={`$${medicine.price}`} expanded={medicine.extras} medicineDetails={medicine}/>
  });
  return (
    <div className="medicine-screen-pharmacist">
      <Header header="Medicine Inventory" subheader="Here you can check your Inventory"/>
      <div className="search-filter-div">
        <SearchBar className="search-bar-medicine" value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterButton options={medicinalUses} filter={filter} setFilter={setFilter}/>
        {isPharmacist ? <div className="add-medicine-container">
          <Link to="/pharmacist/addMedicine" className="add-medicine-button-container">
            <Button type="button">
              <AiOutlinePlus color="#fff" size={20} />
              Add Medicine
            </Button> 
          </Link>
        </div>: null}
      </div>
      {mappedArray}
    </div>
  );
};

export default MedicineScreen;