import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

function comics({ comics }) {
  return (
    <main className={styles.main}>
      <div className={styles.charactersContainer}>
        {comics.map((comic) => (
          <div key={comic.id} className={styles.character}>
            <img
              src={comic.thumbnail.path + "/portrait_fantastic.jpg"}
              alt="character"
            />
            <div className={styles.characterInfo}>
              <Link href={"/comics/" + comic.id}>
                <p>{comic.title}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default comics;

export async function getStaticProps(context) {
  let time = 1;
  let api_key = "40c7ae95cd05146a49ca12d5450dfde5";

  let hash2 = "f1338ace3bfdf9514e1aa592805d4813";
  let url2 = `http://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=80&ts=${time}&apikey=${api_key}&hash=${hash2}`;

  const res = await fetch(url2, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  const comics = data.data.results;

  return {
    props: { comics },
  };
}
