import React, { useContext } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

function characters({ characters }) {
  const { searchResults } = useContext(Context);

  // />
  return (
    <main className={styles.main}>
      <div className={styles.charactersContainer}>
        {characters.map((character) => (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100,
                },
              },
            }}
            key={character.id}
            className={styles.character}
          >
            <img
              src={character.thumbnail.path + "/portrait_fantastic.jpg"}
              alt="character"
            />
            <div className={styles.characterInfo}>
              <Link href={"/characters/" + character.id}>
                <p>{character.name}</p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default characters;

export async function getStaticProps(context) {
  let time = 1;
  let api_key = "40c7ae95cd05146a49ca12d5450dfde5";

  let hash2 = "f1338ace3bfdf9514e1aa592805d4813";
  let url2 = `http://gateway.marvel.com/v1/public/characters?orderBy=modified&limit=100&ts=${time}&apikey=${api_key}&hash=${hash2}`;

  const res = await fetch(url2, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  const characters = data.data.results;

  return {
    props: { characters }, // will be passed to the page component as props
  };
}
