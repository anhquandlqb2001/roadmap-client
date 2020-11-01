import { useContext } from "react";
import ReactMap from "../components/reactmap";
import { UserContext } from "../lib/util/userContext";
const Home = () => {
  const user = useContext(UserContext);
  console.log(user);
  
  return (
    <div>
      <ReactMap />
    </div>
  );
};

export default Home;
