import React from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function InformationSkeleton({ classes, id, title, rawKeywords, description }) {
  return (
    <Card className={classes.information}>
      <CardContent>
        <Typography className={classes.title} variant="h6" color="primary">
          {title}
        </Typography>

        <Typography className={classes.keywords} variant="subtitle2">
          {rawKeywords.map((item, index) => {
            return <span key={index}>{item} </span>;
          })}
        </Typography>

        <Typography className={classes.description} variant="body1">
          Donec non tellus diam. Phasellus sit amet gravida magna. Sed vulputate
          velit et convallis aliquet. Fusce orci eros, dignissim id nisi eu,
          hendrerit aliquet velit. In ut porta enim. Proin neque lectus, pretium
          a egestas ut, bibendum nec nibh. Maecenas elementum risus turpis.
          Quisque pharetra purus eu placerat ultricies.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InformationSkeleton;
