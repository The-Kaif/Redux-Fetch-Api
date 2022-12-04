import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Octokit } from "octokit";
import { fetchUser } from "../redux/userSlice";


function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  console.log("List", list);

  return (
    <div>
      <section>
        <center>
          <div>
            <h1>Github User</h1>
          </div>
        </center>
      </section>
    </div>
  );
}

export default Home;
