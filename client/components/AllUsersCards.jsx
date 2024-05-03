"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./Card";
import { gql, useQuery } from "@apollo/client";
import Pagination from "./Pagination";
import BasicPagination from "./Pagination";

const GET_USERS = gql`
  query {
    getUsers {
      id
      username
      firstName
    }
  }
`;

function AllUsersCards() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.getUsers);
    }
    console.log(data);
  }, [loading, data]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col justify-between items-center gap-y-60">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 m-10 mx-40">
        {currentUsers.map((item) => (
          <ProfileCard
            username={`@${item.username}`}
            firstname={item.firstName}
          />
        ))}
      </div>
      <BasicPagination
        pages={Math.ceil(users.length / usersPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}

export default AllUsersCards;
