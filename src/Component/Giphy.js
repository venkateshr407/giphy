import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Paginate from './Paginate';

const Giphy = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(25)
    const indexOfLastItem =  currentPage - itemsPerPage;
    const indexOfFirstItem =  indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

        useEffect(() => {
            const fetchData = async () => {
                setIsError(false)
                setIsLoading(true)
                try{
                    const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "JtCl7WGi1CbWSqiVgZ5IGmuhsekv5DAG",
                        limit:100
                    }
                });
                setData(results.data.data)
                
                }catch(err){
                    setIsError(true);
                }         
                setIsLoading(false)
            }
            fetchData()
         }, [])

         const fetchImage = () =>{
             if(isLoading){
                 return <Loader/>
             }
            return currentItems.map(el => {
                return(
                <div key={el.id} className="gif">
                    <img alt="img" src={el.images.fixed_height.url}/>
                </div>
                )
            });
        } 
        const renderError = () => {
            if(isError){
                return(
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Unable to get gifs, for the moment please try again.
                    </div>
                )
            }
        }
        const handleSearch = (e) => {
            setSearch(e.target.value)
            
        }
        const handleSubmit = async (e) =>{
            e.preventDefault()
            setIsError(false)
            setIsLoading(true)
            try{
                const results = await axios('https://api.giphy.com/v1/gifs/search',{
                    params:{
                        api_key:"JtCl7WGi1CbWSqiVgZ5IGmuhsekv5DAG",
                        q:search,
                        limit: 15
                    }
                })
                setData(results.data.data)
            } catch (err){
                setIsError(true);
            }
             setIsLoading(false);          
        }

        const pageSelected = (pageNumber) => {
            setCurrentPage(pageNumber)
        }
        
        return (
            <div className="container mt-1"> 
                {renderError()}
                <div className="forms">
                    <form className="form"> 
                    <h1>Giphy's API</h1>
                    <span>Developed by: <a href="https://venkycreations.netlify.com/" target="_blank" rel="noreferrer"> Venkatesh</a></span>
                    <div className="form">
                        <input 
                            className="form-control"
                            placeholder="search for gif"
                            type="text"
                            onChange={handleSearch}
                            value={search}
                        />
                        <button onSubmit={handleSubmit} className="btn btn-success m-0">Go</button>
                        </div>
                    </form>
                </div>
                <Paginate pageSelected={pageSelected} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/>
                <div className="gifs"> {fetchImage()}</div>
            </div>
        )
    }
    

   
    export default Giphy;
