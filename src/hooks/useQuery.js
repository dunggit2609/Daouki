import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import React from 'react'
import qs from 'query-string'
export const  useQuery = () => {
    const { search } = useLocation();
  
    return React.useMemo(() => qs.parse(search), [search]);
  }