import React, { useContext, useEffect, useRef, useState } from "react";
import { getMap, getMapInfo, getMapList, startMap } from "../../lib/api/road";
import { MAP_SERVICE_ENDPOINT } from "../../lib/util/endpoints.constant";
import { Paper, Box, Container, Button } from "@material-ui/core";
import NavBar from "../../components/home.page/NavBar";
import styled from "styled-components";
import Map from "../../components/map/Map";
import { findOwnerMapIDIfExist } from "../../components/map/service";
import { UserContext } from "../../lib/util/userContext";

const Road = ({ id, description }) => {
  const map = useRef(null);
  const [userHasStartedMap, setUserHasStartedMap] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchMap = async () => {
      const response = await getMap(`${MAP_SERVICE_ENDPOINT}/${id}`);
      response.data.success && (map.current = response.data.data.map);
    };
    if (user.user) {
      fetchMap();
      const mapId = findOwnerMapIDIfExist(user?.map, id);
      mapId ? setUserHasStartedMap(true) : setUserHasStartedMap(false);
    }
  }, [user.user, id]);

  const onStartMap = async () => {
    try {
      const response = await startMap(id);
      if (response.data.success) {
        setUserHasStartedMap(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
// commit
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <PaperStyled>
          <Intro description={description} />
        </PaperStyled>
        {!userHasStartedMap && (
          <Box>
            <Button onClick={onStartMap}>Bat dau lo trinh ngay</Button>
          </Box>
        )}
        <Paper>
          <Map
            id={id}
            user={user}
            map={map}
            userHasStartedMap={userHasStartedMap}
          />
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
