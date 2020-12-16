import React from "react";
import { getMap, getMapInfo, getMapList, startMap } from "../../lib/api/road";
import { MAP_SERVICE_ENDPOINT } from "../../lib/util/endpoints.constant";
import { Paper, Box, Container, Button } from "@material-ui/core";
import styled from "styled-components";
import Map from "../../components/map/Map";
import { findOwnerMapIDIfExist } from "../../components/map/service";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../lib/util/userContext";
import Layout from "../../components/common/Layout";

interface Props {
  name: string;
  id: string;
  description: string;
}

const Road: React.FC<Props> = ({ id, description, name }) => {
  const map = React.useRef(null);
  const profile = React.useContext(UserContext);
  const [userHasStartedMap, setUserHasStartedMap] = React.useState<boolean>(
    false
  );
  const [delayed, setDelayed] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  React.useMemo(() => {
    const fetchMap = async () => {
      const response = await getMap(`${MAP_SERVICE_ENDPOINT}/${id}`);
      response.data.success && (map.current = response.data.data.map);
    };
    if (profile.user) {
      const mapId = findOwnerMapIDIfExist(profile?.map, id);
      console.log(mapId);
      
      mapId ? setUserHasStartedMap(true) : setUserHasStartedMap(false);
      return fetchMap();
    }
  }, [profile.user]);

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

  return (
    <Layout
      profile={profile}
      title={name}
      content="Lo trinh hoc tap danh cho lap trinh vien"
    >
      <Container maxWidth="xl">
        <PaperStyled>
          <Intro description={description} />
        </PaperStyled>
        {!userHasStartedMap && !delayed ? (
          <Box>
            <Button onClick={onStartMap}>Bat dau lo trinh ngay</Button>
          </Box>
        ) : null}

        <Paper>
          {delayed ? (
            <Box
              display="flex"
              width={"100%"}
              height={"70vh"}
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton variant="rect" width={"100%"} height={"100%"} />
            </Box>
          ) : (
            <Map
              id={id}
              profile={profile}
              map={map}
              userHasStartedMap={userHasStartedMap}
            />
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

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

const PaperStyled = styled(Paper)`
  display: flex;
  justify-content: center;
`;

export default Road;
