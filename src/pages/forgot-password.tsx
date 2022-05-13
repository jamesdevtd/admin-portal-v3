import LoginLayout from '@/components/layout/LoginLayout';

export default function Dashboard() {
  return (
    <LoginLayout pageTitle='Forgot password'>
      <div className=''>
        <div className='content'>
          <div className='content-wrap'>
            <div className='m-auto flex w-full flex-col gap-5'>
              <section className='my-40 flex flex-col items-center'>
                <h3 className='text-lg'>FORGOT PASSWORD PAGE....</h3>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
