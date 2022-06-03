import { MouseEvent, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Props } from "../types";

import Image from "next/image";
import styles from "../styles/Home.module.css";

import Tech from "../components/tech";
import Projects from "../components/projects";
import Works from "../components/works";

export const getStaticProps: GetStaticProps = async () => {
  const [userRes, reposRes] = await Promise.all([
    fetch("https://api.github.com/users/arthurpeixotomelo"),
    fetch("https://api.github.com/user/repos"
    , {
      method: "get",
      headers: {
        Authorization: (process.env.GIT_TOKEN as string)
      }
    })
  ]);
  const [userdata, reposdata] = await Promise.all([
    userRes.json(),
    reposRes.json(),
  ]);
  return {
    props: {
      user: (({
        avatar_url,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
      }) => ({
        avatar_url,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
      }))(userdata),
      repos: reposdata.map((item: any) => ({
        name: item.name,
        private: item.private,
        homepage: item.homepage,
        topics: item.topics,
      })),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
};

const Home: NextPage<Props> = ({ user, repos }) => {
  const [active, setActive] = useState("Tech");
  function handleChange(e: MouseEvent) {
    setActive((e.target as HTMLInputElement).id);
  }
  return (
    <div className={styles.background}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.photo}>
            <Image
              priority
              placeholder="blur"
              blurDataURL={
                "data:image/webp;base64,UklGRqYDAABXRUJQVlA4WAoAAAAgAAAAvgAAhAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBoAQAAcA8AnQEqvwCFAD7tbq1PM7+koiuXayPwHYlnbt/mQsiuDqzsokn6FYGEEkycS+AEhpgCxtNuaY4VcZcuXMVuaTnbJN3Kl0C6Vr9pDoZXdJwTJA7hJXqiBHGoTtkHtWqqfAeCOuN7pPswj668eL0S1QZVULILVjy4cb3ibhOV/Fd7pOuAAP7xMMBjIURRgBPcd4Wa4CAd1UTNrrwAFVYxyjOv0Tm/WvPJxeLc4j+moTyh6k5NUPMcYCFfmRwfs856TfaCOW9KRjOnSoVTPyqugRV52Tvh7QzaKA428PYjlKx8qWti7F3swHSsVAEav0uDnyqp5lQ1IfHk/J1G0EchO6vIa5DJDFrnIkJ7CUHp1YStksd8Mj6H0iMgD6cT0/ZdxpzJi2NPw+976uPZrjmt27bQfGmmqhBKz8H1ZhORFvwE4ghh95Jw71fd+KG6mIF1eVhJXYibB4nJMLqCIelD6FTPTVwAAAAA"
              }
              src={user.avatar_url}
              alt="profile photo"
              layout="fill"
              objectFit="fill"
            />
          </div>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <address>
            <Image
              src="/images/location.svg"
              alt="Map Pin"
              layout="intrinsic"
              width={24}
              height={24}
            />
            <span>{user.location}</span>
          </address>
          <div className={styles.contact}>
            <a
              href="https://github.com/arthurpeixotomelo"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/github.svg"
                alt="GitHub"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/arthurpeixotomelo/"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/linkedin.svg"
                alt="Linkedin"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
            <a
              href="mailto:arthurpeixotomelo@gmail.com"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/mail.svg"
                alt="Email"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <span>Language</span>
              <div className={styles.toggle}>
                <input type="checkbox" id="language" />
                <label htmlFor="language">
                  <Image
                    src="/images/language.svg"
                    alt="Language"
                    layout="fill"
                    objectFit="fill"
                  />
                </label>
              </div>
            </div>
            <div className={styles.button}>
            <a
                  href="/curriculo.pdf"
                  download="Curriculo - Arthur Peixoto Melo"
                >
              <p>
                Curriculo
                <Image
                  src="/images/download.svg"
                  alt="Download"
                  layout="fixed"
                  width={24}
                  height={24}
                />
              </p>
            </a>
            </div>
            <div className={styles.button}>
              <span>Theme</span>
              <div className={styles.toggle}>
                <input type="checkbox" id="Theme" />
                <label htmlFor="Theme">
                  <Image
                    src="/images/theme.svg"
                    alt="Theme"
                    layout="fill"
                    objectFit="fill"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={styles.cards}>
            <div className={styles.education}>
              <p>
                <Image
                  src="/images/bachelor.svg"
                  alt="Bachelor"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                <span>Ciência de Dados</span>
              </p>
              <p>
                <Image
                  src="/images/university.svg"
                  alt="University"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                UNIVESP
              </p>
              <p>
                <Image
                  src="/images/certificate.svg"
                  alt="Certificate"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                2021 - 2025
              </p>
            </div>
            <div className={styles.stats}>
              <p>
                <Image
                  src="/images/repository.svg"
                  alt="Repository"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.public_repos - 1} Repositórios
              </p>
              <p>
                <Image
                  src="/images/follow.svg"
                  alt="Followers"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.followers} Seguidores
              </p>
              <p>
                <Image
                  src="/images/follow.svg"
                  alt="Following"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.following} Seguindo
              </p>
            </div>
          </div>
          <nav>
            <div className={styles.switch}>
              <input
                type="radio"
                name="section"
                id="Tech"
                defaultChecked
                onClick={handleChange}
              />
              <label htmlFor="Tech">Tech</label>
              <input
                type="radio"
                name="section"
                id="Projects"
                onClick={handleChange}
              />
              <label htmlFor="Projects">Projetos</label>
              <input
                type="radio"
                name="section"
                id="Works"
                onClick={handleChange}
              />
              <label htmlFor="Works">Trabalhos</label>
              <div className={styles.slider}></div>
            </div>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        {active == "Tech" && <Tech />}
      </main>
      <section className={styles.section}>
        {active == "Projects" &&
          repos.slice(1).filter(repo => {
              return (!repo.private);
            }).map((repo, i) => {
              return <Projects key={i} repo={repo} />;
            })}
      </section>
      <section className={styles.section}>
        {active == "Works" &&
          repos
            .slice(1)
            .filter(repo => {
              return repo.private == true;
            })
            .map((repo, i) => {
              return <Works key={i} repo={repo} />;
            })}
      </section>
    </div>
  );
};

export default Home;
