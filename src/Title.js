import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Title);
