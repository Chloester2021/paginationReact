import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);
  const handleClick = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };
  useEffect(() => {
    if (loading) return;
    // loading is necessary because data will be empty at first
    setFollowers(data[page]);
  }, [loading, page]);
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline"></div>
        <section className="followers">
          <div className="container">
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>
          {!loading && (
            <div className="btn-container">
              <button className="prev-btn" onClick={prevPage}>
                prev
              </button>
              {data.map((item, index) => {
                return (
                  <div
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                    key={index}
                    id={index}
                    onClick={() => handleClick(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}
              <button className="next-btn" onClick={nextPage}>
                next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
