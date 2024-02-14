import React, { ReactElement } from 'react';

interface AdminProps {
  // Add any props that the Admin component may receive
  // For example:
  // title: string;
}

export default function Admin({ /* destructure props if any */ }: AdminProps): ReactElement {
  return (
    <div>Admin</div>
  );
}