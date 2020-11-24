import { Card, makeStyles } from '@material-ui/core';
import React from 'react';
import Commento from '../../../../components/Commento/Commento';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .commentsCard': {
      padding: 60,
    },
  },
}));

const Comments = ({ id }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className="commentsCard">
        <Commento id={id} />
      </Card>
    </div>
  );
};

export default Comments;
