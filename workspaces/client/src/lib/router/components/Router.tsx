import React, { useState, useMemo } from "react";
import { RouterContext, type PathSetter } from "../contexts/RouterContext";

export type RouterProps = React.PropsWithChildren<{
  initialPath?: string;
  updatePath?: PathSetter;
  fallback?: React.ComponentType;
}>;

export const Router: React.FC<RouterProps> = ({
  children,
  updatePath,
  initialPath = "",
  fallback: Fallback,
}) => {
  const [path, setPath] = useState(initialPath);
  const [isPathMatched, setIsPathMatched] = useState(false);

  const contextValue = useMemo(() => {
    return updatePath
      ? { path: initialPath, setPath: updatePath, setIsPathMatched }
      : { path, setPath, setIsPathMatched };
  }, [path, initialPath, updatePath, setIsPathMatched]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
      {Fallback && !isPathMatched && <Fallback />}
    </RouterContext.Provider>
  );
};
