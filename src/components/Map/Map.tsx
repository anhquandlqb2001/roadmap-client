import React from "react";
import { fillChildNodes, handleClick, fillParentNode } from "./service/service";
import { useRouter } from "next/router";
import Axios from "axios";
interface MapProps {
  id: string;
  profile: any;
  map: any;
  userHasStartedMap: boolean;
}

const Map: React.FC<MapProps> = ({
  profile,
  map,
  id,
  userHasStartedMap,
}): JSX.Element | null => {
  const ImportedMapRef = React.useRef();
  const [loading, setLoading] = React.useState(() => false);
  const [_, setRef] = React.useState(null);

  const router = useRouter();

  React.useEffect((): void => {
    setLoading(true);
    const importMap = async (): Promise<void> => {
      try {
        // ImportedMapRef.current = (
        //   await import(`../../../public/maps/${id}.svg`)
        // ).default;
        ImportedMapRef.current = (
          await Axios.get(`https://res.cloudinary.com/duhye49dt/image/upload/v1609838999/maps/${id}.svg`).then(res => {
            return res.data
          })
        );
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importMap();
  }, []);

  const onClickKey = async (e, node): Promise<void | boolean> => {
    if (!profile.user) return console.log("Ban chua dang nhap!");
    if (userHasStartedMap)
      return await handleClick(id, { ...map }, e, node, router);
    return console.log("Ban chua dang ky lo trinh nay!");
  };

  const onRefChange = React.useCallback((node) => {
    // ref value changed to node
    setRef(node); // e.g. change ref state to trigger re-render
    if (node === null) {
      // node is null, if DOM node of ref had been unmounted before
    } else {
      // ref value exists
      if (map) {
        if (userHasStartedMap) {
          fillChildNodes(map, node, true);
          fillParentNode(map, node, true);
        }
        const nodeList = node.querySelectorAll(".node--child");
        nodeList.forEach((btn) => {
          btn.addEventListener("click", (e) => onClickKey(e, node));
        });
      }
    }
  }, []);

  if (!loading && ImportedMapRef.current) {
    // const { current: ImportedMap } = ImportedMapRef;
    return (
      <>
        <div ref={onRefChange} style={{backgroundColor: "white", margin: "20px"}}>
          {/* <ImportedMap /> */}
          <div dangerouslySetInnerHTML={{__html: ImportedMapRef.current }}></div>
        </div>
      </>
    );
  }

  return null;

  
};

export default Map;
