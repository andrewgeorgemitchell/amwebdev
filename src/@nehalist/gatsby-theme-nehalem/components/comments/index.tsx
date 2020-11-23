import { Typography } from '@material-ui/core';
import React from 'react';
import Commento from '../../../../components/Commento/Commento';

const Comments = ({ id }) => (
  <div>
    <Commento id={id} />
  </div>
);

export default Comments;
