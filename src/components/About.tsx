import React, { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="text-center w-50 mx-auto">
        <div className="display-3 ">About</div>
        <p>
          This is a React app that allows users to create, read, update, and
          delete cards. It contacts our college API for managing the data
          related to these cards.
        </p>
        <p>
          Handling user authentication and authorization is a key feature of
          this app. With different levels of access, users can perform different
          actions as per these levels User, Business, Admin.
        </p>
      </div>
    </>
  );
};

export default About;
