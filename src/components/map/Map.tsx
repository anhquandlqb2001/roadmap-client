import React from "react";
import { NextPage } from "next";
import { fillMap, isObjEmpty, handleClick } from "./service";

interface MapProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  user: any;
  map: any;
  userHasStartedMap: boolean;
}

const Map: NextPage<MapProps> = ({
  user,
  map,
  id,
  userHasStartedMap,
  ...rest
}): JSX.Element | null => {
  const ImportedMapRef = React.useRef<
    NextPage<React.SVGProps<SVGSVGElement>>
  >();
  const [loading, setLoading] = React.useState(() => false);
  const svgRef = React.useRef(null);

  React.useEffect((): void => {
    setLoading(true);
    const importMap = async (): Promise<void> => {
      try {
        ImportedMapRef.current = (await import(`./img/${id}.svg`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importMap();
  }, []);

  const onClickKey = async (
    e: React.MouseEvent<SVGPathElement>
  ): Promise<void> => {
    if (!user.user) return console.log("Ban chua dang nhap!");
    if (userHasStartedMap) return await handleClick(id, map, e, svgRef);
    return console.log("Ban chua dang ky lo trinh nay!");
  };

  React.useEffect(() => {
    if (ImportedMapRef.current && svgRef.current) {
      if (!isObjEmpty(map)) {
        userHasStartedMap && fillMap(map, svgRef);
        const nodeList = svgRef.current?.querySelectorAll(".node--child");
        nodeList.forEach((node) => {
          node.addEventListener("click", onClickKey);
        });
      }
    }

    return () => {
      const nodeList = svgRef.current?.querySelectorAll(".node--child");
      nodeList.forEach((node) => {
        node.removeEventListener("click", onClickKey);
      });
    };
  }, [ImportedMapRef.current]);

  if (!loading && ImportedMapRef.current) {
    const { current: ImportedMap } = ImportedMapRef;
    return (
      <>
        <div ref={svgRef}>
          <ImportedMap {...rest} />
        </div>
      </>
    );
  }
  return null;
};

export default Map;
