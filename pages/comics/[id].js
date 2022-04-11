import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

let time = 1;
let api_key = "40c7ae95cd05146a49ca12d5450dfde5";
let hash2 = "f1338ace3bfdf9514e1aa592805d4813";
let url2 = `http://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=80&ts=${time}&apikey=${api_key}&hash=${hash2}`;

export const getStaticPaths = async () => {
  const res = await fetch(url2, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  const comics = data.data.results;

  const paths = comics.map((comic) => {
    return {
      params: { id: comic.id.toString() },
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
    `http://gateway.marvel.com/v1/public/comics/${id}?ts=${time}&apikey=${api_key}&hash=${hash2}`
  );
  const data = await res.json();
  return {
    props: {
      comic: data.data.results,
    },
  };
};

const ComicInfo = ({ comic }) => {
  return (
    <>
      {comic.map((cr) => (
        <main className={styles.main}>
          <div className={styles.topContainer}>
            <div className={styles.thumbnail}>
              <motion.img initial='hidden' animate='visible' variants={{
                hidden:{
                  scale:0,
                  opacity:0
                },
                visible:{
                  scale:1,
                  opacity:1,
                  transition:{
                    delay:.2
                  }
                }
              }}
                src={cr.thumbnail.path + "/portrait_uncanny.jpg"}
                alt="thumbnail"
              />
            </div>
            <div className={styles.info}>
              <motion.p initial='hidden' animate='visible' variants={{
                hidden:{
                  scale:0,
                  opacity:0
                },
                visible:{
                  scale:1,
                  opacity:1,
                  transition:{
                    delay:.4
                  }
                }
              }} className={styles.title}>{cr.title}</motion.p>
              <motion.p initial='hidden' animate='visible' variants={{
                hidden:{
                  scale:0,
                  opacity:0
                },
                visible:{
                  scale:1,
                  opacity:1,
                  transition:{
                    delay:.7
                  }
                }
              }} className={styles.desc}>
                {cr.description ? cr.description : "no description available"}
              </motion.p>
            </div>
          </div>
        </main>
      ))}
    </>
  );
};

export default ComicInfo;
