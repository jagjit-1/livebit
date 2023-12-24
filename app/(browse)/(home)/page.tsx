import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      This is the homepage
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
