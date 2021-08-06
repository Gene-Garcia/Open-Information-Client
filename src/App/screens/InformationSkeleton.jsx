import React, { useState } from "react";

// Router
import { Link } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { Fade } from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  flexRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  title: {},
  actions: {},
  editIcon: {},
}));

function InformationSkeleton({ classes, id, title, rawKeywords, description }) {
  const [hover, setHover] = useState(false);

  // Styles, Additional Classes
  const addClasses = useStyles();

  return (
    <Fade in={true}>
      <Card className={classes.information}>
        <CardContent>
          <div className={addClasses.flexRoot}>
            <div className={addClasses.title}>
              <Typography
                className={classes.title}
                variant="h6"
                color="primary"
              >
                {title}
              </Typography>
            </div>

            <div className={addClasses.actions}>
              <Fab
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                component={Link}
                to={`/edit/${id}/title/${title}/`}
                size="small"
                color={hover ? "primary" : "default"}
              >
                <EditIcon size="small" className={addClasses.editIcon} />
              </Fab>
            </div>
          </div>

          <Typography className={classes.keywords} variant="subtitle2">
            {rawKeywords.map((item, index) => {
              return <span key={index}>{item} </span>;
            })}
          </Typography>

          <Typography className={classes.description} variant="body1">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default InformationSkeleton;
