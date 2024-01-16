import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [data, setData] = useState([
    { username: "user1", name: "User One", email: "user1@example.com" },
    { username: "user2", name: "User Two", email: "user2@example.com" },
    // ... more data
  ]);

  const inputRef = useRef();

  useEffect(() => {
    const results = data.filter((person) =>
      person.username.toLowerCase().includes(searchUsername.toLowerCase())
    );
    setSearchResults(results);
  }, [searchUsername, data]);

  const handleUserClick = (selectedUser) => {
    setSelectedUsers((prevUsers) => [...prevUsers, selectedUser]);
    setSearchUsername("");
    setData((prevData) => prevData.filter((user) => user !== selectedUser));
    inputRef.current.focus();
    document.execCommand("selectAll", false, null);
  };

  const handleTagRemove = (removedUser) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user !== removedUser)
    );
    setSearchResults((prevResults) => [...prevResults, removedUser]);
    inputRef.current.focus();
    document.execCommand("selectAll", false, null);
  };

  return (
    <>
      <div className=" ml-[10vw]">
        <p className=" text-center pt-2 font-extrabold text-4xl text-blue-700">
          Pick Users
        </p>
        <div className="justify-center flex-col">
          <div className="p-4">
            <div
              ref={inputRef}
              contentEditable
              className="border p-2 w-[80vw] bg-white"
              placeholder="Enter username"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}
            >
              {selectedUsers.map((user, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 p-2 m-1"
                  contentEditable="false"
                >
                  {user.name}{" "}
                  <span
                    className="cursor-pointer text-red-600"
                    onClick={() => handleTagRemove(user)}
                  >
                    x
                  </span>
                </span>
              ))}
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="bg-white shadow-xl w-[60vw]">
              <ul className="">
                {searchResults.map((person, index) => (
                  <li
                    key={index}
                    className=" hover:bg-gray-300 p-2 flex gap-10 cursor-pointer"
                    onClick={() => handleUserClick(person)}
                  >
                    <div className=" bg-slate-400 w-6 h-6 rounded-[100%]"></div>
                    <p>{person.name}</p>
                    <p>{person.email}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
