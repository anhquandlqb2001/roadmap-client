import ReactMarkdown from 'react-markdown'
import axios from 'axios'

const PHP = ({rawDoc}) => {
  return (
    <ReactMarkdown  />
  )
}

export const getStaticPaths = () => {
  
}

export const getStaticProps = async () => {
  const response = await axios.get("")
}

export default PHP
