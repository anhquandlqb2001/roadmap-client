import React from "react";
import { getMapInfo, getMapList } from "../../lib/api/road";
import { USER_SERVICE_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  Paper,
  Box,
  Button,
  Typography,
  Theme,
  makeStyles,
  AppBar,
  Tab,
  Tabs,
} from "@material-ui/core";
import styled from "styled-components";
import Map from "../../components/Map/Map";
import { findOwnerMapIDIfExist } from "../../components/Map/service/service";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../lib/util/userContext";
import Layout from "../../components/Common/Layout";
import Comment from "../../components/Comment/Comment";
import { useRouter } from "next/router";
import { getMap, startMap } from "../../lib/api/user";

interface Props {
  name: string;
  id: string;
  description: string;
  mapUrl: string
}

const Road: React.FC<Props> = ({ id, description, name, mapUrl }) => {
  const profile = React.useContext(UserContext);
  const [userHasStartedMap, setUserHasStartedMap] = React.useState<boolean>(
    false
  );
  const [delayed, setDelayed] = React.useState<boolean>(true);
  const [map, setMap] = React.useState({});
  const classes = useStyles();

  const [tabIndex, setTabIndex] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 1) {
      router.push(`${router.asPath}?tabIndex=1`, undefined, {shallow: true})
    } else {
      const newPath = router?.asPath?.split("?")[0];
      router.push(newPath, undefined, { shallow: true });
    }
  };

  
  React.useEffect(() => {
    const prevTabIndex = router?.asPath?.split("?")[1];
    prevTabIndex && setTabIndex(1);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  React.useMemo(() => {
    const fetchMap = async () => {
      const response = await getMap(`${USER_SERVICE_ENDPOINT}/${id}`);
      response.data.success && setMap(response.data.data.map);
    };
    if (profile.user) {
      fetchMap();
      const mapId = findOwnerMapIDIfExist(profile?.map, id);
      mapId ? setUserHasStartedMap(true) : setUserHasStartedMap(false);
    } else {
      setMap({});
    }
  }, [profile.user]);

  const onStartMap = async () => {
    try {
      const response = await startMap(id);
      if (response.data.success) {
        router.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      profile={profile}
      title={name}
      content={`Lộ trình học tập ${name}`}
    >
      <>
        <PaperStyled>
          <Intro description={description} />
          {profile.user && (!userHasStartedMap && !delayed ? (
            <Box my={2}>
              <Button variant={"outlined"} onClick={onStartMap}>Bắt đầu lộ trình ngay</Button>
            </Box>
          ) : null)}
        </PaperStyled>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Lộ trình" {...a11yProps(0)} />
              <Tab label="Bình luận" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            <Box maxWidth={"1400px"} mx={"auto"}  border={"1px solid black"} borderRadius={"20px"}>
              {delayed ? (
                <Box
                  display="flex"
                  height={"70vh"}
                  width={"100%"}
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
                  mapUrl={mapUrl}
                />
              )}
            </Box >
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Box m="auto" maxWidth="900px">
              <Comment mapId={id} />
            </Box>
          </TabPanel>
        </div>
      </>
    </Layout>
  );
};

const Intro = ({ description }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx={"10%"}
    >
      <h1>{description.title}</h1>
      <p style={{fontSize: "1.2rem"}}>{description ? description.detail : `Lo trinh hoc tap`}</p>
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
  if (!response.data.success || !response.data) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      name: response.data.data.name,
      id: response.data.data._id,
      description: response.data.data.description || "Everything you need",
      mapUrl: response.data.data?.mapUrl
    },
  };
}

const PaperStyled = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default Road;
