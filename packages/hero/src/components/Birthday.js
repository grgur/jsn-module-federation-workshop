import { useState } from 'react';
import { differenceInDays } from 'date-fns';

const bday = new Date('12/12/2022');

const Birthday = () => {
  const [diff] = useState(() => differenceInDays(bday, new Date()));
  return <div>My birthday is in {diff} days</div>;
};

export default Birthday;
