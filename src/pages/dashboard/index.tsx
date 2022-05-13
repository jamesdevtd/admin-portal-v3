import { getSession } from "next-auth/react";

import ContentWrap from "@/components/layout/ContentWrap";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <ContentWrap>
        <h3>Dashboard</h3>
      </ContentWrap>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}