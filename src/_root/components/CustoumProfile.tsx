import { useParams } from "react-router-dom"

const CustoumProfile = () => {
    const {id} = useParams()
  return (
    <div className="">
        <h1>CustoumProfile</h1>
        <h1>{id}</h1>
    </div>
  )
}

export default CustoumProfile