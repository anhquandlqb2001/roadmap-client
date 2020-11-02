import { useContext } from "react";
import ReactMap from "../components/ReactMap";
import { UserContext } from "../lib/util/userContext";
const Home = () => {
  const user = useContext(UserContext);
  console.log(user);
  
  return (
    <div>
    </div>
  );
};

export default Home;
