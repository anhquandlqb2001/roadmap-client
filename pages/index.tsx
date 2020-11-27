import React, { useEffect, useState } from "react";
import { UserContext } from "../src/lib/util/userContext";
import RoadAPI from "../src/lib/api/road";
import Link from "next/link";
import MyButton from "../src/components/common/MyButton";
import { mutate } from "swr";
import { CURRENT_USER_ENDPOINT } from "../src/lib/util/endpoints.constant";
import NavBar from "../src/components/home.page/NavBar";
import Intro from "../src/components/home.page/Intro";
import Main from '../src/components/home.page/Main'
import { IRoad } from "../src/lib/util/types";

const shouldRenderStartBtn = (map, road, btnName) => {
  if (
    typeof map === "object" &&
    typeof map?.find((m) => m.mapHasStarted === road._id) === "undefined"
  ) {
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

const Home = () => {
  const { map } = React.useContext(UserContext);
  const [roads, setRoads] = useState<IRoad[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await RoadAPI.get_maps_list();
      setRoads(response?.data?.roads);
    };
    fetch();
  }, []);

  const renderBtn = () => {
    if (!roads) {
      return "Khong co lo trinh nao";
    }
    return roads.map((road) => {
      const btnName = road.name.toUpperCase();
      return (
        <div
          key={road._id}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Link href={`/road/${road.name.toLowerCase()}/${road._id}`}>
            <MyButton loading={false} label={btnName}></MyButton>
          </Link>
          {shouldRenderStartBtn(map, road, btnName)}
        </div>
      );
    });
  };

  return <>
    <NavBar />
    <Intro />
    <Main maps={roads} />
  </>
};

export default Home;
