import React from "react";
import { Button } from "yoda-design-system";

const UploadPicture = props => {
  return (
    <Button>
      Upload
      <input
        id="upload"
        name="upload"
        type="file"
        onInput={props.onChange}
        style={{ opacity: 0 }}
      />
    </Button>
  );
};

export default UploadPicture;
