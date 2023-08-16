import React, { useState, useEffect, ChangeEvent } from "react";
import IUser from "../types/user.types";
import userApi from "../services/user.service";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUsers = () => {
    userApi
      .getAllUsers()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveUser = (user: IUser, index: number) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findByEmailContaining = () => {
    userApi
      .findUserByEmail(searchName)
      .then((response: any) => {
        setUsers(response.data);
        setCurrentUser(null);
        setCurrentIndex(-1);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByEmailContaining}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                  {user.email}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentUser.firstName}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentUser.lastName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Role:</strong>
                </label>{" "}
                {currentUser.role}
              </div>
              <div>
                <label>
                  <strong>Locked:</strong>
                </label>{" "}
                {String(currentUser.locked)}
              </div>
              <div>
                <label>
                  <strong>Enabled:</strong>
                </label>
                {String(currentUser.enabled)}
              </div>
              <div>
                <label>
                  <strong>Account Non Expired:</strong>
                </label>
                {String(currentUser.accountNonExpired)}
              </div>
              <div>
                <label>
                  <strong>Account Non Locked:</strong>
                </label>{" "}
                {String(currentUser.accountNonLocked)}
              </div>
              <div>
                <label>
                  <strong>Authorities:</strong>
                </label>{" "}
                {currentUser.authorities[0].authority}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
