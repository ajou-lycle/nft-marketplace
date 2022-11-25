import React from "react";
import { useState } from "react";

export const isEdit = (props) => {
  console.log("props:", props);
  const [is_edit, setIs_edit] = useState(false);

  const handleEditMode = (e) => {
    setIs_edit(!is_edit);
  };
  return (
    <>
      <div>
        <h3></h3>
      </div>
    </>
  );
};
