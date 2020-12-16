import React from "react";
import { fillMap, isObjEmpty, handleClick } from "./service";

interface MapProps extends React.SVGProps<SVGSVGElement> {
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
  ...rest
}): JSX.Element | null => {
  const ImportedMapRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement>>
  >();
  const [loading, setLoading] = React.useState(() => false);
  const [ref, setRef] = React.useState(null);

  React.useEffect((): void => {
    setLoading(true);
    const importMap = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (
          await import(`../../../public/maps/${id}.svg`)
        ).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importMap();
  }, []);

  const onClickKey = async (e, node): Promise<void> => {
    if (!profile.user) return console.log("Ban chua dang nhap!");
    if (userHasStartedMap) return await handleClick(id, { ...map }, e, node);
    return console.log("Ban chua dang ky lo trinh nay!");
  };

  const onRefChange = React.useCallback((node) => {
    // ref value changed to node
    setRef(node); // e.g. change ref state to trigger re-render
    if (node === null) {
      // node is null, if DOM node of ref had been unmounted before
    } else {
      // ref value exists
      if (!isObjEmpty(map)) {
        userHasStartedMap && fillMap(map, node);
        const nodeList = node.querySelectorAll(".node--child");
        nodeList.forEach((btn) => {
          btn.addEventListener("click", (e) => onClickKey(e, node));
        });
      }
    }
  }, []);

  React.useEffect(() => {
    if (ref) {
      if (map.current) {
        userHasStartedMap && fillMap(map, ref);
        const nodeList = ref.querySelectorAll(".node--child");
        nodeList.forEach((btn) => {
          btn.addEventListener("click", (e) => onClickKey(e, ref));
        });
      }
    }

    return () => {
      console.log("clean 1");
      console.log(ref);
      
      if (ref) {
        console.log("clean 2");
        if (map.current) {
          console.log("clean 3");

          userHasStartedMap && fillMap(map, ref);
          const nodeList = ref.querySelectorAll(".node--child");
          nodeList.forEach((btn) => {
            btn.removeEventListener("click", (e) => onClickKey(e, ref));
          });
        }
      }
    };
  }, [userHasStartedMap]);

  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;
    return (
      <>
        <div ref={onRefChange}>
          <ImportedMap {...rest} />
        </div>
      </>
    );
  }

  return null;
};

export default Map;
