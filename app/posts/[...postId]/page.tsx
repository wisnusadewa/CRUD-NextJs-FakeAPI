
export default function PostDetail({params}:{params: {postId:string}} ) {
  return (
    <div>post {params.postId[0]}</div>
  )
}
