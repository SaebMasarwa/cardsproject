import { FunctionComponent } from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  return (
    <div className="display-5">
      404 - PAGE NOT FOUND
      <img src="./404.png" />
    </div>
  );
};

export default PageNotFound;
