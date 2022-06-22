import { useSession } from "next-auth/react"


import ContentWrap from "@/components/layout/ContentWrap";
import Layout from "@/components/layout/Layout";



export default function Dashboard() {
  
  const { data: session } = useSession();
  if (session) {
    console.log('session: ');
    console.log(session);
  } else {
    console.log('NO SESSION');
  }

  return (
    <Layout>
      <ContentWrap>

        <h3>{session ? 'Dashboard' : 'NOT LOGGED IN'}</h3>
      </ContentWrap>
    </Layout>
  )
}
