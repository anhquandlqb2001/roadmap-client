import React, { useEffect, useRef, useState } from "react";
import ReactMap from "../../components/map/5fb12e6e581d3b79b1362e13";
import {
  getMap,
  changeFieldMap,
  getMapInfo,
  getMapList,
} from "../../lib/api/road";
import { MAP_SERVICE_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  recursiveChangeObject,
  findVal,
  fillMap,
} from "../../components/map/service";
import { Paper, Box, Container } from "@material-ui/core";
import NavBar from "../../components/home.page/NavBar";
import styled from "styled-components";
import Map from "../../components/map/Map";
import useCurrent from "../../lib/util/useCurrent";

const Road = ({ id, description }) => {
  const user = useCurrent()
  const [map, setMap] = useState({})
  useEffect(() => {
    const fetchMap = async () => {
      const response = await getMap(`${MAP_SERVICE_ENDPOINT}/${id}`)
      response.data.success && setMap(response.data.data.map)
    }

    fetchMap()
  }, [user])

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <PaperStyled>
          <Intro description={description} />
        </PaperStyled>
        <Paper>
          <Map id={id} user={user} map={map} />
        </Paper>
      </Container>
    </>
  );
};

const PaperStyled = styled(Paper)`
  display: flex;
  justify-content: center;
`;
const Intro = ({ description }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="60%"
    >
      <h1>{description.title}</h1>
      <h2>
        {description
          ? description.detail
          : `A JavaScript library for building user interfaces A JavaScript library
        for building user interfaces A JavaScript library for building user
        interfaces A JavaScript library for building user interfaces A
        JavaScript library for building user interfaces A JavaScript library for
        building user interfaces`}
      </h2>
    </Box>
  );
};

export async function getStaticPaths() {
  const response = await getMapList();
  const paths = response.data.maps.map((map) => ({
    params: { id: map._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await getMapInfo(params.id);
  if (!response.data.success) {
    return;
  }

  return {
    props: {
      name: response.data.data.name,
      id: response.data.data._id,
      description: response.data.data.description || "Everything you need",
    },
  };
}

export default Road;