import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDao } from "../redux/reducers/daoSlice";
import { Link } from "react-router-dom";

const Mainpage = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
   dispatch(getDao())
  },[dispatch])

  const dao = useSelector((state)=>state.dao);

  function getRandomColorFromSelected() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F833FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  return (
    
    <div className="container">
      <div className="dao" >
      <div className="create-dao">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="create-dao-title">My Dao</h5>
            <div className="create-dao-list d-flex gap-2">
              <div className="create-dao-item position-relative">
                <div
                  className="logo route d-flex align-items-center justify-content-center"
                 
                >
                  <span>+</span>
                </div>
                <h6 className="text-center mt-2">Create Dao</h6>
                <Link to={'/createDao'} className="position-absolute top-0 bottom-0 start-0 end-0"></Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="discover-dao">
        <div className="row">
          <div className="col-lg-12">
          <h5 className="discover-dao-title">Discover Dao</h5>
          </div>
         <div className="col-lg-4">
         <div className="discover-dao-search position-relative">
            <input className="form-control" type="text" name="" id="" placeholder="Search Dao" />
            <button className="position-absolute search" type="button"><img src="/public/search.svg" alt="..." /></button>
          </div>
         </div>
        
          <div className="discover-dao-list mt-4">
            <div className="row">
            {dao.value.map((item,key)=>
            
                <div className="col-2 col-lg-2" key={key}>
                <div className="discover-dao-item position-relative">
               <div className="logo d-flex align-items-center justify-content-center"  style={{ background: getRandomColorFromSelected() }}>
                <span>{item.daoName.slice(0,2)}</span>
                
               </div>
               <h6 className="text-center mt-2">{item.daoName}</h6>
               <Link to={'/daoDetail/1'} className="position-absolute top-0 start-0 end-0 bottom-0"></Link>
              </div>
          
                </div>
                
              )}
          
            </div>
          
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default Mainpage;
