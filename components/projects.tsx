import { Repo } from "../types"
import Link from "next/link"
import styles from "../styles/Projects.module.css";

const Projects = ({repo}: Repo) => {
  return (
    <section>
      <h3>{repo.name}</h3>
      {/* <div>
        <div title="Thumbnail of repos.name" >
          <iframe src="/" frameborder="0"></iframe>
        </div>
        <div>
          <Link href="repos.homepage">
            <a>{repos.name}</a>
           </Link>
          <div>
            repos.topics
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default Projects