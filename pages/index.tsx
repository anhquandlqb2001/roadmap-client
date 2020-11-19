import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../lib/util/userContext";
import RoadAPI from '../lib/api/road'
import Link from 'next/link'

const Home = () => {
  const user = useContext(UserContext);
  console.log(user);

  const [roads, setRoads] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const response = await RoadAPI.get_maps_list()
      setRoads(response.data.roadIDs)
    }
    fetch()
  }, [])

  console.log(roads);

  const renderBtn = () => {
    return roads.map(road => {
      return  <Link href={`/road/${road}`}><a>click me</a></Link>
    })
  }
  

  return (
    <div>
      <button onClick={() => RoadAPI.start_map("5fb12e6e581d3b79b1362e13")}>
        Start React Road
      </button>
      {renderBtn()}

    </div>
  );
};

export default Home;
