import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex justify-center items-center text-center ">
        <p>Signed in as {session?.user?.name} </p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center h-screen  flex-col space-y-10  ">
      <p>You are not signed in</p>
      <button  onClick={() => signIn()}>Sign in</button>
    </div>
  )
}