import Grade from "./Grade";
import Quantity from "./Quantity";
import Price from "./Price"

export default function Filter({selectedGrade,setSelectedGrade,quantityRange,setQuantityRange,setPriceRange,setSubmitClicked}){

    return (
        <div>
            <Grade selectedGrade = {selectedGrade} setSelectedGrade = {setSelectedGrade}/>
            <Quantity quantityRange = {quantityRange}  setQuantityRange = {setQuantityRange} />
            <Price setPriceRange = {setPriceRange}/>
            <button onClick={()=>setSubmitClicked(true)}>Submit</button>
        </div>
    )
}