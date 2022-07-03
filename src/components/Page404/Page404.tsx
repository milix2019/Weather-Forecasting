import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image404 } from '../../assets';

const Page404 = (): JSX.Element => {
  const history = useNavigate();

  return (
    <div className="page404">
      <Image404 />
      <h4 className="mt-2">Oops, you have lost</h4>
      <p>We can not find the page that you are looking for...</p>
      <button className="primary-button goBack" onClick={() => history(-1)}>
        Go back
      </button>
    </div>
  );
};
export default Page404;
