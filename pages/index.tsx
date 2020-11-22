import React, { useEffect, useState } from "react";
import { UserContext } from "../lib/util/userContext";
import RoadAPI from "../lib/api/road";
import Link from "next/link";
import MyButton from "../components/common/MyButton";
import { mutate } from "swr";
import { CURRENT_USER_ENDPOINT } from "../lib/util/endpoints.constant";

const Home = () => {
  const user = React.useContext(UserContext);
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await RoadAPI.get_maps_list();
      setRoads(response?.data?.roads);
    };
    fetch();
  }, []);

  const shouldRenderStartBtn = (road, btnName) => {
    if (!user || user?.map?.mapHasStarted.find((m) => m === road._id)) {
      return (
        <MyButton
          label={`Start ${btnName} road`}
          loading={false}
          onClick={async () => {
            await RoadAPI.start_map(road._id);
            await mutate(CURRENT_USER_ENDPOINT);
          }}
        />
      );
    }
  };

  const renderBtn = () => {
    return roads.map((road) => {
      const btnName = road.name.toUpperCase();
      return (
        <div
          key={road._id}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Link href={`/road/${road.name}/${road._id}`}>
            <MyButton loading={false} label={btnName}></MyButton>
          </Link>
          {shouldRenderStartBtn(road, btnName)}
        </div>
      );
    });
  };

  return <div>{renderBtn()}</div>;
};

export default Home;
