import { getSession } from "next-auth/react";

import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h3>Dashboard</h3>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession({req: context.req});
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