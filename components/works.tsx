import { Repo } from "../types"
import styles from "../styles/works.module.css";

const Works = ({repo}: Repo) => {
  return (
    <section>
      <h3>{repo.name}</h3>
    </section>
  )
}

export default Works