import styles from "../../styles/Home.module.css";

let time = 1;
let api_key = "40c7ae95cd05146a49ca12d5450dfde5";
let hash2 = "f1338ace3bfdf9514e1aa592805d4813";
let url2 = `http://gateway.marvel.com/v1/public/characters?orderBy=modified&limit=100&ts=${time}&apikey=${api_key}&hash=${hash2}`;

export const getStaticPaths = async () => {
  const res = await fetch(url2, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  const characters = data.data.results;

  const paths = characters.map((character) => {
    return {
      params: { id: character.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${id}?ts=${time}&apikey=${api_key}&hash=${hash2}`
  );
  const data = await res.json();
  return {
    props: {
      character: data.data.results,
    },
  };
};

const CharacterInfo = ({ character }) => {

  return (
    <>
      {character.map((cr) => (
        <main className={styles.main}>
          <div className={styles.topContainer}>
            <div className={styles.thumbnail}>
              <img
                src={cr.thumbnail.path + "/portrait_uncanny.jpg"}
                alt="thumbnail"
              />
            </div>
            <div className={styles.info}>
              <p className={styles.title}>{cr.name}</p>
              <p className={styles.desc}>{cr.description?cr.description:"no description available"}</p>
            </div>
          </div>
        <section className={styles.comicsSection}>

            <p>Comics({cr.comics.items.length})</p>
          <div className={styles.comicsContainer}>
            {cr.comics.items.map((comic) => (
              <div className={styles.comicsLinks}>
                <div className={styles.links}>
                  <a href={comic.resourceURI}>{comic.name}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.comicsSection}>

            <p>Series({cr.series.items.length})</p>
          <div className={styles.comicsContainer}>
            {cr.series.items.map((s) => (
              <div className={styles.comicsLinks}>
                <div className={styles.links}>
                  <a href={s.resourceURI}>{s.name}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.comicsSection}>

            <p>Stories({cr.stories.items.length})</p>
          <div className={styles.comicsContainer}>
            {cr.stories.items.map((s) => (
              <div className={styles.comicsLinks}>
                <div className={styles.links}>
                  <a href={s.resourceURI}>{s.name}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
        </main>
      ))}
    </>
  );
};

export default CharacterInfo;
