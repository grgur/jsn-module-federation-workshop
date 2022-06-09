import { useState } from 'react';
import { format } from 'date-fns';

const Today = () => {
  const [date] = useState(() => format(new Date(), 'dd/MM/yyyy'));
  return (
    <div>
      Today: <time>{date}</time>
    </div>
  );
};

export default Today;
