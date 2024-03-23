import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ChecklistItemPage = () => {
  const [item, setItem] = useState();
  const params = useParams();
  useEffect(() => {
    const getDataFromApi = async () => {
    };
    getDataFromApi();
  }, [params]);
  return (
    <>
      <Link>Back</Link>
    </>
  );
};

export default ChecklistItemPage;
