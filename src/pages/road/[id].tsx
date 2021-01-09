import React from "react";
import { getMap, getMapInfo, getMapList, startMap } from "../../lib/api/road";
import { MAP_SERVICE_ENDPOINT } from "../../lib/util/endpoints.constant";
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
import Map from "../../components/map/Map";
import { findOwnerMapIDIfExist } from "../../components/map/service/service";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../lib/util/userContext";
import Layout from "../../components/common/Layout";
import { mutate } from "swr";
import Comment from "../../components/comment/Comment";
import { useRouter } from "next/router";

interface Props {
  name: string;
  id: string;
  description: string;
}

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
        <Box p={3}>
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

const Road: React.FC<Props> = ({ id, description, name }) => {
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
    console.log(newValue);
    
    setTabIndex(newValue);
    router.push({
      pathname: router.asPath,
      query: { tabIndex: newValue },
    });

    // window.location.href
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  React.useMemo(() => {
    const fetchMap = async () => {
      const response = await getMap(`${MAP_SERVICE_ENDPOINT}/${id}`);
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
        setUserHasStartedMap(true);
        mutate(`${MAP_SERVICE_ENDPOINT}/${id}`);
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
      <>
        <PaperStyled>
          <Intro description={description} />
          {!userHasStartedMap && !delayed ? (
            <Box my={2}>
              <Button onClick={onStartMap}>Bat dau lo trinh ngay</Button>
            </Box>
          ) : null}
        </PaperStyled>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Xem lo trinh" {...a11yProps(0)} />
              <Tab label="Binh luan" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            <Paper>
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
                />
              )}
            </Paper>
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
      maxWidth="60%"
    >
      <h1>{description.title}</h1>
      <h2>{description ? description.detail : `Lo trinh hoc tap`}</h2>
    </Box>
  );
};

export async function getStaticPaths() {
  const response = await getMapList();
  console.log(response.data);
  
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
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`;

export default Road;
