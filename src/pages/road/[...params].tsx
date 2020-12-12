import React, { useState } from "react";
import ReactMap from "../../components/map/ReactMap";
import { getMap, changeFieldMap } from "../../lib/api/road";
import { withRouter } from "next/router";
import { ROAD_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  recursiveChangeObject,
  findVal,
  fillMap,
} from "../../components/map/service";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import NavBar from "../../components/home.page/NavBar";
import styled from 'styled-components'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

type TabValueProps = "map" | "docs" | "comments";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const Road = ({ router }) => {
  const [road, setRoad] = useState({});
  const [tab, setTab] = useState<TabValueProps>("map");

  const mapName = router.query.params && router.query.params[0];
  const mapId = router.query.params && router.query.params[1];

  if (mapId === "undefined") {
    return null;
  }

  React.useEffect(() => {
    const fetchMap = async () => {
      const response = await getMap(`${ROAD_ENDPOINT}/${mapId}/info`);
      setRoad(response.data.data.map);
    };
    try {
      if (typeof mapId !== "undefined") fetchMap();
    } catch (error) {
      console.log(error);
    }
  }, [mapId]);

  const handleClick = async (
    mapId: string,
    ownerMapId: string,
    map,
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const fieldChange = e.currentTarget.getAttribute("id");
    const currentValue = findVal(map, fieldChange);
    if (e.ctrlKey) {
      alert("redirect now");
      return;
    }

    setRoad(recursiveChangeObject(map, fieldChange, !currentValue.value));

    await changeFieldMap({
      mapId: mapId,
      ownerMapId: ownerMapId,
      fieldChange: fieldChange,
      currentValue: !currentValue.value,
    }).then((result) => {
      if (!result.data.success) {
        return;
      }
      console.log(result.data);
      fillMap(map);
    });
  };

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: TabValueProps
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <PaperStyled>
          <Intro name={mapName} details="asdjaskjdhajks" />
        </PaperStyled>
        <Paper>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="map" label="Lo trinh" wrapped {...a11yProps("map")} />
            <Tab value="docs" label="Huong dan" {...a11yProps("docs")} />
            <Tab
              value="comments"
              label="Binh luan"
              {...a11yProps("comments")}
            />
          </Tabs>
        </Paper>
        <TabPanel value={tab} index="map">
          <ReactMap mapId={mapId} handleClick={handleClick} road={road} />
        </TabPanel>
        <TabPanel value={tab} index="docs">
          Item Two
        </TabPanel>
        <TabPanel value={tab} index="comments">
          Item Three
        </TabPanel>
      </Container>
    </>
  );
};

const PaperStyled = styled(Paper)`
  display: flex;
  justify-content: center;
`
const Intro = ({name, details}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" maxWidth="60%" >
      <h1>{name?.toUpperCase()}</h1>
      <h2>A JavaScript library for building user interfaces A JavaScript library for building user interfaces A JavaScript library for building user interfaces A JavaScript library for building user interfaces A JavaScript library for building user interfaces A JavaScript library for building user interfaces</h2>
    </Box>
  );
};

export default withRouter(Road);
