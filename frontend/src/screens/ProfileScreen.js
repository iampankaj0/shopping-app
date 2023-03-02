import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserDetails, logout } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, laoding, error } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getUserDetails());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo?.token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {laoding ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1 className="my-4 text-center">PROFILE</h1>
          {error ? (
            <Message variant={"danger"} alert={error} />
          ) : (
            <>
              <div className="profile_main_section">
                <p>
                  <span style={{ fontWeight: "900", color: "brown" }}>
                    Name:
                  </span>{" "}
                  {user?.name}
                </p>
                <p>
                  <span style={{ fontWeight: "900", color: "brown" }}>
                    Email:
                  </span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span style={{ fontWeight: "900", color: "brown" }}>
                    Is Admin:
                  </span>{" "}
                  {user?.isAdmin === false ? "false" : "true"}
                </p>
              </div>
              <Link
                to={"/updateprofile"}
                style={{ width: "fit-content" }}
                className="btn btn-danger d-block mx-auto my-4"
              >
                Edit Profile
              </Link>
              <Button
                variant="success"
                className="mx-auto d-block"
                onClick={handleLogout}
              >
                LOG OUT
              </Button>
            </>
          )}
        </FormContainer>
      )}
    </>
  );
};

export default ProfileScreen;
