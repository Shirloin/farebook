/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchContext } from '../context/SearchContext'
import style from '../style/components/Searchbar.module.css'
import {useContext} from 'react'
export default function SearchBar(){
    const {searchTerm, setSearchTerm} = useContext(SearchContext)
    return (
        <input type="text" className={style.input} onChange={(e:any)=>{setSearchTerm(e.target.value)}} value={searchTerm}/>
    )
}